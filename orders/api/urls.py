from django.urls import path, include
from rest_framework.routers import DefaultRouter


from orders.api.views import OrdersViewSet

# Create a router and register viewsets with it.
router = DefaultRouter()
router.register('', OrdersViewSet, 'orders')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
