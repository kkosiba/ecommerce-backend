from django.urls import include, path

from newsletter.api.views import Subscribers

urlpatterns = [path("", Subscribers.as_view(), name="list_subscribers")]
