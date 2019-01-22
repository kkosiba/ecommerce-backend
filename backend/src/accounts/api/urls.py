from django.urls import path, include

from accounts.api.views import (
    RegistrationAPI,
    LoginAPI,
    UserAPI,
)

urlpatterns = [
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('', include('knox.urls')),
]
