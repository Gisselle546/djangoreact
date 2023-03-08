from django.contrib import admin

# Register your models here.
from .models import ProductItem, ProductImage, ProductOption, ProductOptionColor, ProductOptionSize

@admin.register(ProductItem)
class ProductAdmin(admin.ModelAdmin):
    """
    Display product list 
    """

    list_display = ['product_id', 'name', 'price', 'description','highlights', 'details',  'inventory_total', 'created_date']


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    """
    Display the list of product image
    """
    list_display = ['product', 'url']




@admin.register(ProductOption)
class ProductOptionsAdmin(admin.ModelAdmin):
    """
    Display the list of Product Options
    """

    list_display=['price', 'sku', 'inventory']

@admin.register(ProductOptionSize)
class ProductOptionSizeAdmin(admin.ModelAdmin):
    """
    Display the Product option Size
    """
    list_display=['size', 'inventory']

@admin.register(ProductOptionColor)
class ProductOptionColorAdmin(admin.ModelAdmin):
    """
    Display the Product option Color
    """
    list_display=['color', 'inventory']