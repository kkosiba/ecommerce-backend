from django.urls import include, path

# from .views import CustomLoginView


urlpatterns = [
    path("", include("rest_auth.urls")),
    # path('login/', CustomLoginView.as_view(), name='login'),
    path("register/", include("rest_auth.registration.urls")),
]
