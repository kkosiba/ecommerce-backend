from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.serializers import LoginSerializer
from rest_auth.registration.serializers import RegisterSerializer

User = get_user_model()


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'name', 'email', )
        read_only_fields = ('email', )


class CustomLoginSerializer(LoginSerializer):
    # username = serializers.CharField(required=False, allow_blank=True)
    username = None
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    password1 = serializers.CharField(write_only=True,
                                      style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True,
                                      style={'input_type': 'password'})
