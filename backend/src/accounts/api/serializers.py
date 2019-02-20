from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.serializers import LoginSerializer
from rest_auth.registration.serializers import RegisterSerializer

try:
    from allauth.account.adapter import get_adapter
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")


User = get_user_model()


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'username', )


class CustomLoginSerializer(LoginSerializer):
    # username = serializers.CharField(required=False, allow_blank=True)
    username = None
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})


class CustomRegisterSerializer(RegisterSerializer):
    username = None # to hide in DRF form
    
    first_name = serializers.CharField(required=True)

    last_name = serializers.CharField(required=True)

    password1 = serializers.CharField(write_only=True,
                                      style={'input_type': 'password'})

    password2 = serializers.CharField(write_only=True,
                                      style={'input_type': 'password'})

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '').capitalize()
        user.last_name = self.validated_data.get('last_name', '').capitalize()
        user.username = user.first_name + ' ' + user.last_name
        user.save(update_fields=['username', 'first_name', 'last_name'])
