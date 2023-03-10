from django.contrib import admin

# Register your models here.
from .models import ProductItem, ProductImage, ProductOption, ProductOptionColor, ProductOptionSize, Brand, Category

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
    list_display = ['product_option_color', 'url']

    def product_option_color(self, obj):
        """
        Method to display the related ProductOption color name
        """
        return obj.product.color
    product_option_color.short_description = 'Product Option Color'


@admin.register(ProductOption)
class ProductOptionsAdmin(admin.ModelAdmin):
    """
    Display the list of Product Options
    """

    list_display=['sku',  'product']
    
    def product(self, obj):
        """
        Return the name of the related product
        """
        return obj.product.name   
   

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

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    """
    Display the brand
    """
    list_display = ['name', 'logo']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Display list of categories
    """
    list_display = ['name', 'slug']