from django.db import models
from account.models import User
from django.utils import timezone

# Create your models here.

class Brand(models.Model):
    name   = models.CharField(max_length=255)
    logo   = models.URLField()

    def __str__(self):
        """
        String Method return the Brand name
        """
        return self.name
    

class Category(models.Model):
    name   = models.CharField(max_length=255)
    slug   = models.CharField(max_length=255, unique=True)

    def __str__(self):
        """
         String Method return the category name
        """
        return self.name

class ProductItem(models.Model):
    product_id  = models.CharField(max_length=8, blank=True, null=True, unique=True)
    name        = models.CharField(max_length=255)
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255, null=True)
    highlights  = models.CharField(max_length=255, null=True)
    details     = models.CharField(max_length=255, null=True)
    brand       = models.ForeignKey(Brand, on_delete=models.CASCADE)
    categories  = models.ManyToManyField(Category, blank=True)
    inventory_total = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        """
        String Method return the product name
        """
        return self.name
    

class ProductImage(models.Model):
    product = models.ForeignKey(ProductItem, related_name='images', on_delete=models.CASCADE)
    url     = models.URLField()

    def __str__(self):
        """
        String Method return the product url
        """
        return self.url
    


class ProductOption(models.Model):
    product   = models.ForeignKey(ProductItem, related_name='product_options', on_delete=models.CASCADE)
    price     = models.DecimalField(max_digits=10, decimal_places=2)
    sku       = models.CharField(max_length=255, blank=True, null=True)
    inventory = models.PositiveIntegerField(default=0)

    def __str__(self):
        """
        String Method return the product name, color and size
        """
        return f"{self.product.name} - {self.price}"

class ProductOptionSize(models.Model):
    product_option = models.ForeignKey(ProductOption, related_name='size', on_delete=models.CASCADE)
    size = models.CharField(max_length=255)
    inventory = models.IntegerField(default=0)

    def __str__(self):
        """
        String Method return the product name, inventory and size
        """
        return f"{self.product_option.product.name} - {self.inventory} - {self.size}"


class ProductOptionColor(models.Model):
    product_option = models.ForeignKey(ProductOption, related_name='color', on_delete=models.CASCADE)
    color = models.CharField(max_length=255)
    inventory = models.IntegerField(default=0)
    
    def __str__(self):
        """
        String Method return the product name, inventory and color
        """
        return f"{self.product_option.product.name} - {self.inventory} - {self.color}"
    

class Review(models.Model):
    product   = models.ForeignKey(ProductItem, on_delete=models.SET_NULL, null=True)
    user      = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)
    name      = models.CharField(max_length=200, null=True, blank=True)
    rating    = models.IntegerField(null=True, blank=True, default=0)
    comment   = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        String Method return the rating for the product 
        """
        return self.rating