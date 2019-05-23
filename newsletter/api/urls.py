from django.urls import path, include

from newsletter.api.views import Subscribers

urlpatterns = [path("", Subscribers.as_view(), name="list_subscribers")]
