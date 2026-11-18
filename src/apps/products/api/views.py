from rest_framework import permissions, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from ..models import Category, Product

from .serializers import CategorySerializer, ProductSerializer


class IsAdminUserOrReadOnly(permissions.BasePermission):
    """Allow read-only access to everyone, write access to staff only."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ProductSerializer
    lookup_field = "slug"

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["category__name", "name", "description"]
