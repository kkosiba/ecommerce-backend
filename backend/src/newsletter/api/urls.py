from django.urls import path, include

from newsletter.api.views import ListSubscribers, AddSubscriber


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', ListSubscribers.as_view(), name="list_subscribers"),
    path('add/', AddSubscriber.as_view(), name="add_subscriber"),
]
