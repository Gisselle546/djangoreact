from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Order
from backend.utils import unique_reference_generator

@receiver(pre_save, sender=Order)
def generate_product_id(sender, instance, **kwargs):
    if not instance.order_id:
        instance.order_id = unique_reference_generator(instance)