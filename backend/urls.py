
from django.contrib import admin
from django.urls import path, include
from order.views import OrderViewSet
from rest_framework import routers
from product.views import ProductDetailView, ProductViewSet, ReviewViewSet, TeamViewSet, SoccerPlayerViewSet
from account.views import RegisterAccount, MyTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'orders', OrderViewSet,basename='order')
router.register(r'products', ProductViewSet)
router.register(r'products/(?P<product_id>[^/.]+)/reviews', ReviewViewSet, basename='product_reviews')
router.register(r'players', SoccerPlayerViewSet)
router.register(r'teams', TeamViewSet)

urlpatterns = [
     path('admin/', admin.site.urls),
     path('login/',  MyTokenObtainPairView.as_view(), name='user_login'),
     path('orders/<str:order_id>/', OrderViewSet.as_view({'get': 'retrieve'}), name='order-detail'),
     path('orders/create/', OrderViewSet.as_view({'post': 'create'}), name='order-create'),
     path('products/<str:product_id>/', ProductDetailView.as_view(), name='product-detail'),
     path('products/<str:product_id>/reviews/average_rating/', ReviewViewSet.as_view({'get': 'average_rating'}), name='review_average_rating'),
     path('register/', RegisterAccount.as_view(), name='user_create'),
     path('', include(router.urls)),
]

