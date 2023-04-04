from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets, filters, status
from django.db.models import Avg
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Team, Product, SoccerPlayer, Review
from .serializers import  ProductSerializer, TeamSerializer, SoccerPlayerSerializer, ReviewSerializer

    
    
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.select_related('brand').prefetch_related('product_options__colors', 'product_options__sizes')
    serializer_class = ProductSerializer
    lookup_field = 'product_id'
    lookup_url_kwarg = 'product_id'

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']

    def get_queryset(self):
        queryset = self.queryset
        tag_name = self.request.query_params.get('tag', None)
        soccer_player_jer = self.request.query_params.get('playerjersey', None)
        query = self.request.query_params.get('q')
        player_first_name = self.request.query_params.get('player_first_name', None)
        player_last_name = self.request.query_params.get('player_last_name', None)
        
        if tag_name is not None:
            queryset = queryset.filter(tags__name=tag_name)
        if soccer_player_jer is not None:
            queryset = queryset.filter(soccerplayerjersey__number__isnull=False)
        if query is not None:
            queryset = queryset.filter(soccerplayerjersey__jersey__team__name__icontains=query)
        if player_first_name is not None and player_last_name is not None:
            queryset = queryset.filter(soccerplayerjersey__player__first_name__icontains=player_first_name, soccerplayerjersey__player__last_name__icontains=player_last_name)
        return queryset



class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'country', 'team_type']
    
    def get_queryset(self):
        queryset = self.queryset
        club_filter = self.request.query_params.get('club', None)
        if club_filter is not None:
            queryset = queryset.filter(team_type='CLUB')
        national_filter = self.request.query_params.get('national', None)
        if national_filter is not None:
            queryset = queryset.filter(team_type='NATIONAL_TEAM')
        return queryset
    


class SoccerPlayerViewSet(viewsets.ModelViewSet):
    queryset = SoccerPlayer.objects.all()
    serializer_class = SoccerPlayerSerializer
    
    search_fields = ['first_name']
    ordering_fields = ['first_name']


class ReviewViewSet(viewsets.ModelViewSet):
    """
    A viewset for creating and retrieving product reviews.
    """
    serializer_class = ReviewSerializer

    def get_queryset(self):
        """
        Only retrieve reviews for the specified product.
        """
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)

    def perform_create(self, serializer):
        """
        Set the product and user fields when creating a new review.
        """
        product_id = self.kwargs['product_id']
        product = get_object_or_404(Product, product_id=product_id)
        serializer.save(product=product, user=self.request.user)

    @action(detail=True, methods=['get'])
    def average_rating(self, request, product_id=None):
        """
        Return the average rating for the specified product.
        """
        queryset = self.filter_queryset(self.get_queryset())
        average_rating = queryset.aggregate(Avg('rating'))['rating__avg']
        return Response({'average_rating': average_rating})