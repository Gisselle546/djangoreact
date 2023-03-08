from django.contrib import admin

# Register your models here.
from .models import Order, OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Display Order list
    """

    list_display= ['order_id', 'customer_name', 'customer_email', 'shipping_address', 'created_date']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """
    Display Order Item
    """
    list_display= ['quantity']