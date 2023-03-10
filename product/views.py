from rest_framework import generics, viewsets, filters, status
from rest_framework.response import Response
from .models import Brand, Category, ProductItem
from .serializers import  ProductSerializer

    
    
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductItem.objects.prefetch_related('product_options__color', 'product_options__size')
    serializer_class = ProductSerializer
    lookup_field = 'product_id'
    lookup_url_kwarg = 'product_id'

class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductItem.objects.all()
    serializer_class = ProductSerializer