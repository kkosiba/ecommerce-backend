from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer

class CustomLoginView(LoginView):
    pass

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
