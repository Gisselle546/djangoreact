from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import ProductItem
from backend.utils import unique_reference_generator

@receiver(pre_save, sender=ProductItem)
def generate_product_id(sender, instance, **kwargs):
    if not instance.product_id:
        instance.product_id = unique_reference_generator(instance)