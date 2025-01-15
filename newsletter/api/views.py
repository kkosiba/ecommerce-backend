from rest_framework import generics

from newsletter.api.permissions import IsPostOrIsAdmin
from newsletter.api.serializers import SubscriberSerializer
from newsletter.models import Subscriber


class Subscribers(generics.ListCreateAPIView):
    """
    API view for listing all existing subscribers (for admins)
    and create new ones (for everyone).

    GET only to users for which user.is_staff returns True.
    """

    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = (IsPostOrIsAdmin,)  # GET for admin, POST for everyone
