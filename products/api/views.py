from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from products.models import Category, Product

from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ProductSerializer
    lookup_field = "slug"

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["category__name", "name", "description"]
