import pytest
from rest_framework import status
from rest_framework.test import APIClient

from src.apps.accounts.models import CustomUser
from src.apps.newsletter.api.serializers import SubscriberSerializer
from src.apps.newsletter.models import Subscriber


@pytest.fixture
def create_users():
    # Create superuser
    superuser = CustomUser.objects.create_superuser(
        first_name="Superuser",
        last_name="Testing",
        email="superuser@testing.com",
        password="superusertestingpassword",
    )
    # Create regular user
    user = CustomUser.objects.create_user(
        first_name="Regular",
        last_name="User",
        email="regularuser@testing.com",
        password="regularusertestingpassword",
    )
    return superuser, user


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_not_authenticated_view_subscribers(api_client):
    """
    Objective(s):
        - Test if a non-authenticated user can view all subscribers via GET request.
    Expectation(s):
        - The response status code should be 401 Unauthorized.
    """
    response = api_client.get(path="/api/subscribers/")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_authenticated_and_not_superuser_view_subscribers(api_client, create_users):
    """
    Objective(s):
        - Test if an authenticated but non-superuser can view all subscribers via GET request.
    Expectation(s):
        - The response status code should be 403 Forbidden.
        - The response data should not match the serialized list of all subscribers.
    """
    _, user = create_users
    api_client.login(
        email="regularuser@testing.com", password="regularusertestingpassword"
    )

    response = api_client.get(path="/api/subscribers/")
    subscribers = Subscriber.objects.all()
    serializer = SubscriberSerializer(subscribers, many=True)

    api_client.logout()

    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.data != serializer.data


@pytest.mark.django_db
def test_admin_view_subscribers(api_client, create_users):
    """
    Objective(s):
        - Test if an admin (superuser) can view all subscribers via GET request.
    Expectation(s):
        - The response status code should be 200 OK.
        - The response data should match the serialized list of all subscribers.
    """
    superuser, _ = create_users
    api_client.login(email="superuser@testing.com", password="superusertestingpassword")

    response = api_client.get(path="/api/subscribers/")
    subscribers = Subscriber.objects.all()
    serializer = SubscriberSerializer(subscribers, many=True)

    api_client.logout()

    assert response.status_code == status.HTTP_200_OK
    assert response.data == serializer.data


@pytest.mark.django_db
def test_create_valid_subscriber(api_client):
    """
    Objective(s):
        - Test if a subscriber with a valid email address can be created.
    Expectation(s):
        - The response status code should be 201 Created.
        - The response data should contain the correct email.
    """
    response = api_client.post(
        path="/api/subscribers/", data={"email": "abc123@abc.com"}
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data.get("email") == "abc123@abc.com"


@pytest.mark.django_db
def test_create_invalid_subscriber(api_client):
    """
    Objective(s):
        - Test if an invalid email address results in a validation error.
    Expectation(s):
        - The response status code should be 400 Bad Request.
        - The error message for the email field should indicate an invalid email.
    """
    response = api_client.post(
        path="/api/subscribers/", data={"email": "asdfadsgcvv2dvsdfg.asda.c/afd"}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data.get("email")[0] == "Enter a valid email address."


@pytest.mark.django_db
def test_create_existing_subscriber(api_client):
    """
    Objective(s):
        - Test if attempting to create a subscriber with an already existing email results in an error.
    Expectation(s):
        - The response status code should be 400 Bad Request.
        - The error message for the email field should indicate the email already exists.
    """
    # Create sample subscriber
    Subscriber.objects.create(email="samplesubscriber@abc.com")

    response = api_client.post(
        path="/api/subscribers/", data={"email": "samplesubscriber@abc.com"}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data.get("email")[0] == "Subscriber with this email already exists."


@pytest.mark.django_db
def test_string_representation():
    """
    Objective(s):
        - Test the string representation of a Subscriber object.
    Expectation(s):
        - The string representation should match the subscriber's email address.
    """
    subscriber = Subscriber.objects.create(email="samplesubscriber@abc.com")
    assert str(subscriber) == "samplesubscriber@abc.com"
