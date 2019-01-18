from django.urls import path, include
from rest_framework.routers import DefaultRouter


from products.api.views import ProductViewSet

# Create a router and register viewsets with it.
router = DefaultRouter()
router.register('products', ProductViewSet, 'products')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    # path('auth/register/', RegistrationAPI.as_view()),
    # path('auth/login/', LoginAPI.as_view()),
    # path('auth/user/', UserAPI.as_view()),
]
