from django.contrib import admin

# Register your models here.
from .models import Order, OrderItem, ShippingAddress

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Display Order list
    """

    list_display= ['order_id', 'payment_method', 'tax_price', 'shipping_price', 'total_price', 'created_date']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """
    Display Order Item
    """
    list_display= ['quantity']


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    """
    Display Shipping Address 
    """
    list_display = ['address', 'city', 'postal_code', 'country', 'shipping_price']