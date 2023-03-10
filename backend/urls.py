
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product.views import ProductViewSet, ProductDetailView

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)


urlpatterns = [
     path('admin/', admin.site.urls),
     path('products/<str:product_id>/', ProductDetailView.as_view(), name='product-detail'),
     path('', include(router.urls)),
]


