from rest_framework import serializers
from .models import Brand, Category, ProductItem, ProductImage, ProductOption, ProductOptionColor, ProductOptionSize, Review


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductOptionColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptionColor
        fields = '__all__'


class ProductOptionSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptionSize
        fields = '__all__'


class ProductOptionsSerializer(serializers.ModelSerializer):
    product_option_size = ProductOptionSizeSerializer(many=True)
    product_option_color = ProductOptionColorSerializer(many=True)

    class Meta:
        model = ProductOption
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    categories = CategorySerializer(many=True)
    product_options = ProductOptionsSerializer(many=True)
    images = ProductImageSerializer(many=True)

    class Meta:
        model = ProductItem
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
