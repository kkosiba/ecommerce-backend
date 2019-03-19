from rest_framework import generics, status
from rest_framework import permissions
# from rest_framework.response import Response

from orders.models import Order
from .serializers import OrderSerializer
from .permissions import IsPostOrIsAdmin

class Orders(generics.ListCreateAPIView):
    """
    API view for listing (admin) or creating (authenticated user) orders.
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # GET for admin, POST for authenticated
    permission_classes = (permissions.IsAuthenticated, IsPostOrIsAdmin, )
