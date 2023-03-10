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
    images = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    class Meta:
        model = ProductOptionColor
        fields = '__all__'

    def get_images(self, obj):
        images = ProductImage.objects.filter(product=obj)
        return ProductImageSerializer(images, many=True).data
    
    def get_size(self, obj):
        # Retrieve the related size data for this ProductOption
        sizes = ProductOptionSize.objects.filter(product_option_color=obj)
        return ProductOptionSizeSerializer(sizes, many=True).data


class ProductOptionSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptionSize
        fields = '__all__'


class ProductOptionSerializer(serializers.ModelSerializer):
   
    color = serializers.SerializerMethodField()
   

    class Meta:
        model = ProductOption
        fields = '__all__'


    def get_color(self, obj):
        # Retrieve the related color data for this ProductOption
        colors = ProductOptionColor.objects.filter(product_option=obj)
        return ProductOptionColorSerializer(colors, many=True).data
  
class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    categories = CategorySerializer(many=True)
    product_options = ProductOptionSerializer(many=True, read_only=True)
   

    class Meta:
        model = ProductItem
        fields = '__all__'

    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        brand_data = validated_data.pop('brand')
        try:
            # Make sure _id field is present in brand_data
            brand = Brand.objects.get(_id=brand_data['id'])
        except KeyError:
            raise serializers.ValidationError("Brand id is missing")
        except Brand.DoesNotExist:
            raise serializers.ValidationError("Brand not found")
        # Make sure _id field is present in validated_data
        product = ProductItem.objects.create(brand=brand, _id=validated_data['_id'], **validated_data)
        for category_data in categories_data:
            try:
                # Make sure _id field is present in category_data
                category = Category.objects.get(_id=category_data['id'])
            except KeyError:
                raise serializers.ValidationError("Category id is missing")
            except Category.DoesNotExist:
                raise serializers.ValidationError("Category not found")
            product.categories.add(category)
        return product


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
