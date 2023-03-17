from django.contrib import admin

# Register your models here.
from .models import Product, ProductImage, ProductOption, ProductColor, ProductSize, Brand, Category, ProductVariant, Team, SoccerPlayer, Tag, SoccerJersey

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Display product list 
    """

    list_display = ['product_id', 'name', 'price', 'description','highlights', 'details' , 'primary_image', 'created_date']


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

    list_display=['product', 'inventory_total', 'get_colors']
    
    def product(self, obj):
        """
        Return the name of the related product
        """
        return obj.product.name
    
    def get_colors(self, obj):
        """
        Return the list of colors for each product option
        """
        return ", ".join([color.name for color in obj.colors.all()])
    
    get_colors.short_description = "Colors"

@admin.register(SoccerJersey)
class SoccerJerseyAdmin(admin.ModelAdmin):
    """
    Display Soccer Jersey
    """
    list_display = ['get_team', 'jersey_type', 'image_url']

    def get_team(self, obj):
        """
        Returns the list of team
        """
        return obj.jerseys.name



@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    """
    Display the list of team admin
    """
    list_display = ['name', 'team_type','location', 'logo_url']

@admin.register(SoccerPlayer)
class SoccerPlayerAdmin(admin.ModelAdmin):
    """
    Display the list of soccer plays in admin
    """
    list_display = ['first_name', 'last_name', 'image_url']

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """
    Display Tag list
    """
    list_display = ['name']
    
@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    """
    Display the product variant list
    """
    list_display = [ 'size', 'inventory', 'get_color', 'get_product' ]

    def get_color(self, obj):
        """
        Return the list of colors for each product option
        """
        return ", ".join([color.name for color in obj.color.all()])
    
    get_color.short_description = "Colors"
    
    def get_product(self, obj):
        """
        Return the related product of each product variant
        """
        return obj.product_option.product.name
    
    get_product.short_description = "Product"

   

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