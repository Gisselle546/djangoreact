from django.contrib import admin

# Register your models here.
from .models import Product, ProductImage, ProductOption, ProductColor, ProductSize, Brand, Category, ProductVariant

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Display product list 
    """

    list_display = ['product_id', 'name', 'price', 'description','highlights', 'details' , 'created_date']


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

    list_display=['product', 'inventory_total']
    
    def product(self, obj):
        """
        Return the name of the related product
        """
        return obj.product.name   

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    """
    Display the product variant list
    """
    list_display = [ 'size', 'inventory']

@admin.register(ProductSize)
class ProductSizeAdmin(admin.ModelAdmin):
    """
    Display the Product option Size
    """
    list_display=['size']

@admin.register(ProductColor)
class ProductColorAdmin(admin.ModelAdmin):
    """
    Display the Product option Color
    """
    list_display=['name']

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