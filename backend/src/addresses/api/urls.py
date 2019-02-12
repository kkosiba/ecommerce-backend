from django.urls import include, path
from rest_framework.routers import DefaultRouter


from .views import (
    BillingAddressViewSet, DeliveryAddressViewSet, )

router = DefaultRouter()
router.register(r'billing_details', BillingAddressViewSet)
router.register(r'delivery_details', DeliveryAddressViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
