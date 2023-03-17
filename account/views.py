from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserSerializerWithToken

# Create your views here.
class RegisterAccount(CreateAPIView):
   serializer_class = UserSerializerWithToken


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    
      