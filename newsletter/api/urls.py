from django.urls import path

from newsletter.api.views import Subscribers

urlpatterns = [path("", Subscribers.as_view(), name="list_subscribers")]
