from django.urls import path

from .views import charge_view

urlpatterns = [path("", charge_view, name="charge_view")]

