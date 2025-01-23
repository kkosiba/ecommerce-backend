from rest_framework import generics

from .permissions import IsPostOrIsAdmin
from .serializers import SubscriberSerializer
from ..models import Subscriber


class Subscribers(generics.ListCreateAPIView):
    """
    API view for listing all existing subscribers (for admins)
    and create new ones (for everyone).

    GET only to users for which user.is_staff returns True.
    """

    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = (IsPostOrIsAdmin,)  # GET for admin, POST for everyone
