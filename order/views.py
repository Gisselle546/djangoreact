from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
import stripe
from .models import Order, ShippingAddress, OrderItem, ProductVariant
from .serializers import OrderSerializer, ShippingAddressSerializer, OrderItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

    def create(self, request):
        user = request.user
        data = request.data

        # (1) Create order
        order = Order.objects.create(
            user=user,
            payment_method=data['payment_method'],
            tax_price=data['tax_price'],
            shipping_price=data['shipping_price'],
            total_price=data['total_price'],
            order_id=data['order_id']
        )

        # (2) Create shipping address
        shipping_data = data['shipping_address']
        shipping_data['order'] = order.id
        shipping_serializer = ShippingAddressSerializer(data=shipping_data)
        if shipping_serializer.is_valid():
            shipping_serializer.save()
        else:
            order.delete()
            return Response(shipping_serializer.errors)

        # (3) Create order items and update stock
        for item_data in data['order_items']:
            variant_data = item_data['product_variant']
            variant_id = variant_data['id']
            quantity = item_data['quantity']

            # check if product variant exists and has enough stock
            try:
                variant = ProductVariant.objects.select_for_update().get(id=variant_id)
            except ProductVariant.DoesNotExist:
                order.delete()
                return Response({'error': f'Product variant with id {variant_id} does not exist.'})

            if variant.stock < quantity:
                order.delete()
                return Response({'error': f'Product variant with id {variant_id} does not have enough stock.'})


            # create order item and update variant stock
            OrderItem.objects.create(
                order=order,
                product_variant=variant,
                quantity=quantity,
            )
            

            with transaction.atomic():
                variant.stock -= quantity
                variant.save()
                product_option = variant.product_option
                product_option.inventory_total -= quantity
                product_option.save()


        # (4) Process payment with Stripe
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(data['total_price'] * 100),
                currency='usd',
                payment_method=data['payment_method'],
                description=f'Order #{order.id}',
                metadata={'order_id': order.id},
            )

            if intent.status == 'requires_action':
                return Response({
                    'client_secret': intent.client_secret,
                    'requires_action': True,
                })

            if intent.status == 'succeeded':
                order.payment_status = Order.PAID
                order.save()

                serializer = OrderSerializer(order)
                return Response(serializer.data)

            else:
                order.delete()
                return Response({'error': 'Payment failed'})

        except stripe.error.CardError as e:
            order.delete()
            body = e.json_body
            err = body.get('error', {})
            return Response({'error': err.get('message')}, status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            order.delete()
            return Response({'error': 'Payment failed'}, status.HTTP_400_BAD_REQUEST)
        
        


    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.get(order_id=pk)
        except Order.DoesNotExist:
            return Response({'error': f'Order with order_id {pk} does not exist.'}, status=404)

        serializer = OrderSerializer(order)
        return Response(serializer.data)
