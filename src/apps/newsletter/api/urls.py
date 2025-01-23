from django.urls import path

from .views import Subscribers

urlpatterns = [path("", Subscribers.as_view(), name="list_subscribers")]
