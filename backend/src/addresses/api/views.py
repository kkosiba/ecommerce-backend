from rest_framework import viewsets

from addresses.models import (
    BillingAddress, DeliveryAddress, )

from .serializers import (
    BillingAddressSerializer, DeliveryAddressSerializer, )

from .permissions import IsOwnerOrAdminOrRestrict

class BillingAddressView(viewsets.ModelViewSet):
    queryset = BillingAddress.objects.all()
    serializer_class = BillingAddressSerializer
    permission_classes = [IsOwnerOrAdminOrRestrict, ]


class DeliveryAddressView(viewsets.ModelViewSet):
    queryset = DeliveryAddress.objects.all()
    serializer_class = DeliveryAddressSerializer
    permission_classes = [IsOwnerOrAdminOrRestrict, ]