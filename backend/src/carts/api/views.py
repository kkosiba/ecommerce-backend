from rest_framework import viewsets, permissions
from .serializers import CartSerializer
from carts.models import Cart, CartItem

class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    # permissions.IsOwner, 
    serializer_class = CartSerializer

    def get_queryset(self):
        return self.request.user.cart

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
