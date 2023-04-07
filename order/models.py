from django.db import models
from product.models import ProductVariant
from account.models import User
from django.utils import timezone

# Create your models here.

class Order(models.Model):
    order_id = models.CharField(max_length=8, blank=True, null=True, unique=True)
    user      = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)
    payment_method = models.CharField(max_length=200, null=True, blank=True)
    tax_price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        """
        string method return order id
        """
        return f"{self.order_id} - {self.total_price}"
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, null=True, blank=True, on_delete=models.CASCADE)
    product_variant = models.ForeignKey(ProductVariant, null=True, on_delete=models.CASCADE)
    quantity = models.IntegerField()
 

    def __str__(self):
        """
        string method order
        """
        return f"{self.order.order_id} - {self.quantity}"

class ShippingAddress(models.Model):
    order         = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address       = models.CharField(max_length=200, null=True, blank=True)
    city          =  models.CharField(max_length=200, null=True, blank=True)
    postal_code    = models.CharField(max_length=200, null=True, blank=True)
    country       = models.CharField(max_length=200, null=True, blank=True)
    shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.address