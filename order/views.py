import json
from django.db import transaction
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from django.views import View
from django.http import JsonResponse
import stripe
import os
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Order, ShippingAddress, OrderItem, ProductVariant
from .serializers import OrderSerializer, ShippingAddressSerializer, OrderItemSerializer

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

    @transaction.atomic()
    def create(self, request):
        user = request.user
        data = request.data
  
        # (1) Create order
        try:
            order = Order.objects.create(
                user=user,
                payment_method=data['payment_method'],
                tax_price=data['tax_price'],
                shipping_price=data['shipping_price'],
                total_price=data['total_price']
            )
        except KeyError as e:
            raise serializers.ValidationError(f'Missing required field: {str(e)}')

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

            if variant.inventory < quantity:
                order.delete()
                return Response({'error': f'Product variant with id {variant_id} does not have enough stock.'})


            # create order item and update variant stock
            order_item = OrderItem.objects.create(
                order=order,
                product_variant=variant,
                quantity=quantity,
            )
            variant.inventory -= quantity
            variant.save()
            product_option = variant.product_option
            product_option.inventory_total -= quantity
            product_option.save()

        # (4) Update payment status
        order.payment_status = Order.ORDER_PAID
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data)




        
        


    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.get(order_id=pk)
        except Order.DoesNotExist:
            return Response({'error': f'Order with order_id {pk} does not exist.'}, status=404)

        serializer = OrderSerializer(order)
        return Response(serializer.data)

@method_decorator(csrf_exempt, name='dispatch')
class CreatePaymentIntentView(View):
    def post(self, request):
       
        try:
            data = json.loads(request.body.decode())
            amount = data['amount']
            if isinstance(amount, str):
                amount = int(float(amount) * 100)
            else:
                amount = int(amount * 100)
            currency = data['currency']
            payment_intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
               
            )
            return JsonResponse({
                'client_secret': payment_intent.client_secret
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)