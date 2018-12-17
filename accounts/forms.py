from django import forms

from django.contrib.auth.forms import (
    UserCreationForm, ReadOnlyPasswordHashField, )

from django.core.exceptions import ValidationError

from .models import User


class UserCreationForm(forms.ModelForm):
    """
    A form for creating new users. Includes all the required
    fields, plus a repeated password.
    """
    password1 = forms.CharField(label='Password',
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation',
                                widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', )

    def clean_email(self):
        # Check if there exists an email in db
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Email already in use!")
        return email

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match!")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """
    A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'password', 'is_active', 'is_admin')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial['password']

# class SignUpForm(UserCreationForm):
#     email = EmailField(label='Email',
#         widget=EmailInput(
#             attrs={'class': 'form-control',
#                    'required': True,
#                    }))
#     password1 = CharField(label='Password',
#         widget=PasswordInput(
#             attrs={'class': 'form-control',
#                    'required': True,
#                    }))
#     password2 = CharField(label='Confirm password',
#         widget=PasswordInput(
#             attrs={'class': 'form-control',
#                    'required': True,
#                    }))

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password1', 'password2', )

#     def clean_username(self):
#         username = self.cleaned_data.get('username')
#         qs = User.objects.filter(username=username)
#         if qs.exists():
#             raise ValidationError("Username already in use!")
#         return username

#     def save(self, commit=True):
#         instance = super().save(commit=False)
#         instance.first_name = self.cleaned_data.get('username', '').capitalize()
#         instance.email = self.cleaned_data.get('email', '')
#         if commit:
#             instance.save()
#         return instance
