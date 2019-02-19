from rest_framework import generics, permissions, status
from rest_framework.response import Response

from newsletter.models import Subscriber
from .serializers import SubscriberSerializer

class ListSubscribers(generics.ListAPIView):
    """
    API view for listing all existing subscribers.

    Only safe requests allowed.

    Visible only to users for which user.is_staff returns True.
    """

    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = (permissions.IsAdminUser, ) # only for admin to view


class AddSubscriber(generics.CreateAPIView):
    """
    API view for adding new subscriber.

    Available via POST request only, no permission restrictions.

    Checks if provided email already exists in the database and raises
    suitable error.
    """
    serializer_class = SubscriberSerializer
    permission_classes = (permissions.AllowAny, )
