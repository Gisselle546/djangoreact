from rest_framework import serializers
from .models import Order, OrderItem, ShippingAddress
from account.serializers import UserSerializer
from product.serializers import ProductVariantSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer()

    class Meta:
        model = OrderItem
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user        = UserSerializer()
    shipping_address = ShippingAddressSerializer()

    class Meta:
        model = Order
        fields = '__all__'



