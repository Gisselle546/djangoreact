from rest_framework import generics

from .models import Brand, Category, ProductItem, ProductImage, ProductOption, ProductOptionColor, ProductOptionSize, Review
from .serializers import BrandSerializer, CategorySerializer, ProductItemSerializer, ProductImageSerializer, ProductOptionSerializer, ProductOptionColorSerializer, ProductOptionSizeSerializer, ReviewSerializer

class BrandList(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class ProductItemList(generics.ListCreateAPIView):
    queryset = ProductItem.objects.all()
    serializer_class = ProductItemSerializer
    
class ProductItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductItem.objects.all()
    serializer_class = ProductItemSerializer
    
class ProductImageList(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    
class ProductImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    
class ProductOptionList(generics.ListCreateAPIView):
    queryset = ProductOption.objects.all()
    serializer_class = ProductOptionSerializer
    
class ProductOptionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductOption.objects.all()
    serializer_class = ProductOptionSerializer
    
class ProductOptionColorList(generics.ListCreateAPIView):
    queryset = ProductOptionColor.objects.all()
    serializer_class = ProductOptionColorSerializer
    
class ProductOptionColorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductOptionColor.objects.all()
    serializer_class = ProductOptionColorSerializer
    
class ProductOptionSizeList(generics.ListCreateAPIView):
    queryset = ProductOptionSize.objects.all()
    serializer_class = ProductOptionSizeSerializer
    
class ProductOptionSizeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductOptionSize.objects.all()
    serializer_class = ProductOptionSizeSerializer
    
class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer