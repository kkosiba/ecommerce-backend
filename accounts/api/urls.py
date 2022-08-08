from django.urls import include, path

from .views import CustomRegisterView

urlpatterns = [
    path("", include("rest_auth.urls")),
    path("register/", include("rest_auth.registration.urls")),
]
