from rest_framework import viewsets
from .serializers import ProductSerializer, CategorySerializer
from products.models import Product, Category

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ProductSerializer
    lookup_field = 'slug'