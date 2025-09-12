import re
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets, filters, status, serializers
from django.db.models import Avg
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Team, Product, SoccerPlayer, Review
from django.core.exceptions import FieldDoesNotExist
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






class ProductSearchView(generics.ListAPIView):
    """
    Unified, *forgiving* search:
      - ?query=mercurial
      - ?query=barcelona | club: fc barcelona
      - ?query=argentina | nat: argentina
      - ?query=lionel messi | player: lionel messi
      - tokenized partials: "dream speed", "barc", "mbap"
    """
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]

    def _normalize(self, s: str) -> str:
        # collapse spaces & trim; we keep accents since DB collation handles case only
        return re.sub(r"\s+", " ", s).strip()

    def _tokens(self, s: str) -> list[str]:
        # split into alnum tokens (barc, dream, speed, 9, etc.)
        return re.findall(r"[A-Za-z0-9]+", s.lower())

    def get_queryset(self):
        qs = (
            Product.objects.select_related("brand")
            .prefetch_related("product_options__colors", "product_options__sizes")
        )

        raw = (self.request.query_params.get("query") or "").strip()
        if not raw:
            return qs.none()

        s = self._normalize(raw)
        lower = s.lower()

        # ------- explicit prefixes (optional) -------
        mode = None  # 'club' | 'national' | 'player' | None
        val = s
        for pfx, m in [
            ("club:", "club"),
            ("team:", "club"),
            ("nationality:", "national"),
            ("country:", "national"),
            ("nat:", "national"),
            ("player:", "player"),
        ]:
            if lower.startswith(pfx):
                mode = m
                val = s[len(pfx) :].strip()
                break

        # ------- helpers -------
        def q_club(v: str) -> Q:
            return Q(
                soccerplayerjersey__jersey__team__team_type="CLUB",
                soccerplayerjersey__jersey__team__name__icontains=v,
            )

        def q_national(v: str) -> Q:
            """
            Safe national matching:
            - always match by national team name
            - if Team.country exists:
                * CharField -> __country__icontains
                * FK -> __country__name__icontains
            """
            base = Q(
                soccerplayerjersey__jersey__team__team_type="NATIONAL_TEAM",
                soccerplayerjersey__jersey__team__name__icontains=v,
            )
            try:
                f = Team._meta.get_field("country")
                if f.is_relation:
                    return base | Q(
                        soccerplayerjersey__jersey__team__country__name__icontains=v
                    )
                else:
                    return base | Q(
                        soccerplayerjersey__jersey__team__country__icontains=v
                    )
            except FieldDoesNotExist:
                return base

        def q_player(v: str) -> Q:
            parts = v.split(" ", 1)
            first = parts[0]
            last = parts[1] if len(parts) > 1 else ""
            qx = Q(soccerplayerjersey__player__first_name__icontains=first)
            if last:
                qx &= Q(soccerplayerjersey__player__last_name__icontains=last)
            return qx

        # ------- base query (product name contains whole string) -------
        q = Q(name__icontains=s)

        # ------- explicit-mode branch -------
        if mode == "club" and val:
            q |= q_club(val)
        elif mode == "national" and val:
            q |= q_national(val)
        elif mode == "player" and val:
            q |= q_player(val)
        else:
            # ------- free text heuristics -------
            parts = s.split(" ", 1)
            if len(parts) > 1:
                # looks like "first last" -> try player
                q |= q_player(s)
            else:
                # single token -> try team (club+national)
                q |= q_club(s) | q_national(s)

        # ------- NEW: tokenized fuzzy matching (AND-of-ORs) -------
        # each token must match *one of* these fields; all tokens must match somewhere
        toks = self._tokens(s)
        if toks:
            token_fields = [
                "name__icontains",
                "soccerplayerjersey__jersey__team__name__icontains",
                "soccerplayerjersey__player__first_name__icontains",
                "soccerplayerjersey__player__last_name__icontains",
            ]
            q_tokens = Q()
            for t in toks:
                per_token = Q()
                for f in token_fields:
                    per_token |= Q(**{f: t})
                q_tokens &= per_token  # AND across tokens
            q |= q_tokens  # OR with the earlier strategies

        # ------- common aliases/synonyms to broaden match -------
        aliases = {
            "psg": "paris saint-germain",
            "barca": "barcelona",
            "man utd": "manchester united",
            "manchester utd": "manchester united",
            "man city": "manchester city",
            "bayern": "bayern munich",
            "rm": "real madrid",
        }
        for alias, canon in aliases.items():
            if alias in lower:
                q |= q_club(canon) | q_national(canon)

        return qs.filter(q).distinct()


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
        product_id = self.kwargs.get('product_id')
        return Review.objects.filter(product__product_id=product_id)

    def perform_create(self, serializer):
        """
        Set the product and user fields when creating a new review.
        """
        product_id = self.kwargs['product_id']
        product = get_object_or_404(Product, product_id=product_id)
        user = self.request.user
        if Review.objects.filter(product=product, user=user).exists():
            raise serializers.ValidationError("You have already reviewed this product.")
        serializer.save(product=product, user=user)

    @action(detail=True, methods=['get'])
    def average_rating(self, request, product_id=None):
        """
        Return the average rating for the specified product.
        """
        queryset = self.filter_queryset(self.get_queryset())
        average_rating = queryset.aggregate(Avg('rating'))['rating__avg']
        return Response({'average_rating': average_rating})