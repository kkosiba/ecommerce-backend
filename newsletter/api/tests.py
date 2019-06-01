from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from newsletter.models import Subscriber
from accounts.models import CustomUser
from .serializers import SubscriberSerializer
from .views import Subscribers

# Create your tests here.
class CreateSubscriber(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create superuser
        self.superuser = CustomUser.objects.create_superuser(
            username="Superuser Testing",
            email="superuser@testing.com",
            password="superusertestingpassword",
        )
        self.superuser.save()

        # Create regular user
        self.user = CustomUser.objects.create_user(
            username="Regular User",
            email="regularuser@testing.com",
            password="regularusertestingpassword",
        )
        self.user.save()

    def test_not_authenticated_view_subscribers(self):
        """Tests whether non-authenticated user can view all subscribers via GET request"""

        response = self.client.get(path="/api/subscribers/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_and_not_superuser_view_subscribers(self):
        """Tests whether authenticated (but not superuser) user can view all subscribers via GET request"""

        self.client.login(
            email="regularuser@testing.com", password="regularusertestingpassword"
        )
        response = self.client.get(path="/api/subscribers/")
        subscribers = Subscriber.objects.all()
        serializer = SubscriberSerializer(subscribers, many=True)
        self.client.logout()
        self.assertNotEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_view_subscribers(self):
        """Tests whether admin user can view all subscribers via GET request"""

        self.client.login(
            email="superuser@testing.com", password="superusertestingpassword"
        )
        response = self.client.get(path="/api/subscribers/")
        subscribers = Subscriber.objects.all()
        serializer = SubscriberSerializer(subscribers, many=True)
        self.client.logout()
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid_subscriber(self):
        """Tests whether a subscriber with a valid email address can be created"""

        response = self.client.post(
            path="/api/subscribers/", data={"email": "abc123@abc.com"}
        )
        self.assertEqual(response.data.get("email"), "abc123@abc.com")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_subscriber(self):
        response = self.client.post(
            path="/api/subscribers/", data={"email": "asdfadsgcvv2dvsdfg.asda.c/afd"}
        )
        self.assertEqual(response.data.get("email")[0], "Enter a valid email address.")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_existing_subscriber(self):
        # Create sample subscriber
        self.subscriber = Subscriber.objects.create(email="samplesubscriber@abc.com")
        self.subscriber.save()

        response = self.client.post(
            path="/api/subscribers/", data={"email": "samplesubscriber@abc.com"}
        )
        self.assertEqual(
            response.data.get("email")[0], "Subscriber with this email already exists."
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
