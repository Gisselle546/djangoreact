
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product.views import ProductDetailView, ProductViewSet, TeamViewSet, SoccerPlayerViewSet
from account.views import RegisterAccount, MyTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'players', SoccerPlayerViewSet)
router.register(r'teams', TeamViewSet)

urlpatterns = [
     path('admin/', admin.site.urls),
     path('login/',  MyTokenObtainPairView.as_view(), name='user_login'),
     path('products/<str:product_id>/', ProductDetailView.as_view(), name='product-detail'),
     path('register/', RegisterAccount.as_view(), name='user_create'),
     path('', include(router.urls)),
]

