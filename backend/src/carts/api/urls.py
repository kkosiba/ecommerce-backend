from django.urls import path, include
from rest_framework.routers import DefaultRouter


from carts.api.views import CartViewSet

# Create a router and register viewsets with it.
router = DefaultRouter()
router.register('', CartViewSet, 'carts')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
