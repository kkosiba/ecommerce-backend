from django.urls import path, include

urlpatterns = [
    path("accounts/", include("accounts.api.urls")),
    path("products/", include("products.api.urls")),
    path("payments/", include("payments.urls")),
    path("subscribers/", include("newsletter.api.urls")),
]
