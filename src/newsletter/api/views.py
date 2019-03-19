from rest_framework import generics, status
from rest_framework.response import Response

from newsletter.models import Subscriber
from .serializers import SubscriberSerializer
from .permissions import IsPostOrIsAdmin

class Subscribers(generics.ListCreateAPIView):
    """
    API view for listing all existing subscribers.

    Only safe requests allowed.

    Visible only to users for which user.is_staff returns True.
    """

    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = (IsPostOrIsAdmin, ) # GET for admin, POST for everyone
