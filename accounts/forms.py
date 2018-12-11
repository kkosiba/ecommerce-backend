from django import forms

from django.forms import (
    ModelForm, TextInput, EmailField,
    EmailInput, CharField, PasswordInput,
    )

from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from django.core.exceptions import ValidationError


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', )


class SignUpForm(UserCreationForm):
    username = CharField(label='Username',
        widget=TextInput(
            attrs={'class': 'form-control',
                   'required': True,
                   }))
    email = EmailField(label='Email',
        widget=EmailInput(
            attrs={'class': 'form-control',
                   'required': True,
                   }))
    password1 = CharField(label='Password',
        widget=PasswordInput(
            attrs={'class': 'form-control',
                   'required': True,
                   }))
    password2 = CharField(label='Confirm password',
        widget=PasswordInput(
            attrs={'class': 'form-control',
                   'required': True,
                   }))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', )

    def clean_username(self):
        username = self.cleaned_data.get('username')
        qs = User.objects.filter(username=username)
        if qs.exists():
            raise ValidationError("Username already in use!")
        return username

    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.first_name = self.cleaned_data.get('username', '').capitalize()
        instance.email = self.cleaned_data.get('email', '')
        if commit:
            instance.save()
        return instance
