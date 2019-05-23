from django.urls import path, include

urlpatterns = [
    path("accounts/", include("accounts.api.urls")),
    path("products/", include("products.api.urls")),
    # path('addresses/', include('addresses.api.urls')),
    # path('carts/', include('carts.api.urls')),
    # path('orders/', include('orders.api.urls')),
    path("payments/", include("payments.urls")),
    path("subscribers/", include("newsletter.api.urls")),
]
