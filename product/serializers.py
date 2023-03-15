from rest_framework import serializers
from .models import Brand, Category, Product, ProductImage, ProductOption, ProductColor, ProductSize, ProductVariant, Review


class BrandSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Brand
        fields = '__all__'

class ProductColorSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = ProductColor
        fields = '__all__'

class ProductSizeSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = ProductSize
        fields = '__all__'
      


class CategorySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Category
        fields = '__all__'
       



class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductVariantSerializer(serializers.ModelSerializer):
    color = ProductColorSerializer(many=True)
    size = ProductSizeSerializer()
  
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ProductOptionSerializer(serializers.ModelSerializer):
    colors = ProductColorSerializer(many=True)
    sizes = ProductSizeSerializer(many=True)
    product_variants = ProductVariantSerializer(many=True)
    class Meta:
        model = ProductOption
        fields = '__all__'



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


  
class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    categories = CategorySerializer(many=True)
    product_options = ProductOptionSerializer(many=True, read_only=True)
    review = ReviewSerializer(many=True)
    
   

    class Meta:
        model = Product
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
        product = Product.objects.create(brand=brand, _id=validated_data['_id'], **validated_data)
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


