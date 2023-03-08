from django.db import models
from product.models import ProductOptions
from django.utils import timezone

# Create your models here.

class Order(models.Model):
    order_id         = models.CharField(max_length=8, blank=True, null=True, unique=True)
    customer_name    = models.CharField(max_length=255)
    customer_email   = models.EmailField()
    shipping_address = models.CharField(max_length=40)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        """
        string method return order id
        """
        return str(self.order_id)
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_options = models.ForeignKey(ProductOptions, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        """
        string method order
        """
        return f"{self.order.order_id} - {self.quantity}"