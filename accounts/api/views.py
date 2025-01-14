from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView

from accounts.api.serializers import CustomRegisterSerializer


class CustomLoginView(LoginView):
    pass


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
