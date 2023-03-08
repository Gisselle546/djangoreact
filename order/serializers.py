from rest_framework import serializers
from .models import Order, OrderItem
from product.serializers import ProductOptionsSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_options = ProductOptionsSerializer()

    class Meta:
        model = OrderItem
        fields = ['product_options', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'order_id', 'customer_name', 'customer_email', 'shipping_address', 'order_items']