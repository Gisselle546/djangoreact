from django.db import models
from django.forms import ValidationError
from account.models import User
from django.utils import timezone

# Create your models here.

class Category(models.Model):
    name   = models.CharField(max_length=255)
    slug   = models.CharField(max_length=255, unique=True)
   
   
    
    def __str__(self):
        """
         String Method return the category name
        """
        return f"{self.name}"



class Brand(models.Model):
    name   = models.CharField(max_length=255)
    logo   = models.URLField()
    
   

    def __str__(self):
        """
        String Method return the Brand name
        """
        return f"{self.name}"
    
class Team(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    logo_url = models.URLField()

    def __str__(self):
        return self.name


class SoccerJersey(models.Model):
    JERSEY_TYPE_CHOICES = (
        ('CLUB', 'Club'),
        ('NATIONAL_TEAM', 'National Team'),
    )

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='jerseys')
    jersey_type = models.CharField(max_length=50, choices=JERSEY_TYPE_CHOICES, default='CLUB')
    name = models.CharField(max_length=100)
    image_url = models.URLField()

    def __str__(self):
        return self.name


class SoccerPlayer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    image_url = models.URLField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class SoccerPlayerJersey(models.Model):
    player = models.ForeignKey(SoccerPlayer, on_delete=models.CASCADE, related_name='player_jerseys')
    jersey = models.ForeignKey(SoccerJersey, on_delete=models.CASCADE, related_name='jersey_players')
    number = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.player} - {self.jersey}"


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
   
    product_id  = models.CharField(max_length=8, blank=True, null=True, unique=True)
    name        = models.CharField(max_length=255)
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255, null=True)
    highlights  = models.CharField(max_length=255, null=True)
    details     = models.CharField(max_length=255, null=True)
    brand       = models.ForeignKey(Brand, on_delete=models.CASCADE)
    categories  = models.ManyToManyField(Category, blank=True)
    created_date  = models.DateTimeField(default=timezone.now)
    primary_image = models.URLField(blank=True, null=True)
    tags               = models.ManyToManyField(Tag, blank=True)
    soccerplayerjersey = models.ForeignKey(SoccerPlayerJersey, related_name='products', on_delete=models.CASCADE, null=True, blank=True)
    

    def __str__(self):
        """
        String Method return the product name
        """
        return f"{self.name} - {self.price}"
    


class ProductColor(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class ProductSize(models.Model):
    size = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return str(self.size)
    


class ProductOption(models.Model):
    
    product = models.ForeignKey(Product, related_name='product_options', on_delete=models.CASCADE)
    colors = models.ManyToManyField(ProductColor, related_name='product_options_colors', blank=True)
    sizes = models.ManyToManyField(ProductSize, related_name='product_options_sizes', blank=True)
    inventory_total = models.IntegerField(default=0)    

    def __str__(self):
        """
        String Method return the product name, color and size
        """
        colors = ', '.join(color.name for color in self.colors.all())
      
        return f"{self.product.name} - {colors} - {self.inventory_total}"
    

class ProductVariant(models.Model):
    product_option = models.ForeignKey(ProductOption, related_name='product_variants', on_delete=models.CASCADE)
    color = models.ManyToManyField(ProductColor, related_name='product_variants_colors', blank=True)
    size = models.ForeignKey(ProductSize, related_name='product_variants_sizes', on_delete=models.CASCADE)
    inventory = models.IntegerField(default=0)

    def __str__(self):
        colors = ', '.join(color.name for color in self.color.all())
        return f"{self.product_option.product.name} - {colors} - {self.size.size} - {self.inventory}"

    def clean(self):
        total_inventory = self.product_option.inventory_total
        for variant in self.product_option.product_variants.exclude(id=self.id):
            total_inventory -= variant.inventory
        if self.inventory > total_inventory:
            raise ValidationError("Inventory cannot exceed product option total inventory.")


class ProductImage(models.Model):
   
    product = models.ForeignKey(ProductVariant, related_name='images', on_delete=models.CASCADE)
    url     = models.URLField()


    def __str__(self):
        """
        String Method return the product url
        """
        return f"{self.product.color} - {self.product.product_option.product.name} "


class Review(models.Model):
    
    product   = models.ForeignKey(Product, related_name='review', on_delete=models.SET_NULL, null=True)
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