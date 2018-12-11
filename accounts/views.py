from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.views import View
from django.utils.decorators import method_decorator
from django.db import transaction
from django.contrib.auth.mixins import LoginRequiredMixin


from .forms import (
	SignUpForm, UserForm, )

from django.urls import reverse_lazy

# Create your views here.

class SignUp(CreateView):
    template_name = 'registration/signup.html'
    form_class = SignUpForm
    success_url = reverse_lazy('accounts:login')

    # prevents signed in user to sign up
    def dispatch(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('/')
        return super().dispatch(*args, **kwargs)


# class UpdateProfile(LoginRequiredMixin, View):
#     """
#     Update user and profile simult.
#     """
#     def get(self, request, *args, **kwargs):
#         user_form = UserForm(instance=request.user)
#         profile_form = ProfileForm(instance=profile)
#         return render(request, 'profiles/profile.html', {
#             'user_form': user_form,
#             'profile_form': profile_form,
#             })

#     @method_decorator(transaction.atomic)
#     def post(self, request, *args, **kwargs):
#         user_form = UserForm(request.POST, instance=request.user)
#         profile_form = ProfileForm(request.POST, instance=request.user.profile)
#         if user_form.is_valid() and profile_form.is_valid():
#             user_form.save()
#             profile_form.save()
#             return redirect('accounts:profile')
#         return render(request, 'profiles/profile.html', {
#             'user_form': user_form,
#             'profile_form': profile_form,
#             })
