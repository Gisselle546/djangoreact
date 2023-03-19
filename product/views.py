from rest_framework import generics, viewsets, filters, status
from rest_framework.response import Response
from .models import Team, Product
from .serializers import  ProductSerializer, TeamSerializer

    
    
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
        if tag_name is not None:
            queryset = queryset.filter(tags__name=tag_name)
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
    


    