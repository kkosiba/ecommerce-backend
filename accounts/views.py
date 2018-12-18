from django.shortcuts import render

from django.views.generic.edit import CreateView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import UserCreationForm


from django.urls import reverse_lazy

# Create your views here.

class AccountDetailView(LoginRequiredMixin, DetailView):
    """
    Detailed account information view
    """
    template_name = 'accounts/account_detail.html'

    def get_object(self):
        return self.request.user


class AccountCreateView(CreateView):
    """
    Sign up view
    """
    template_name = 'accounts/account_create.html'
    form_class = UserCreationForm
    success_url = reverse_lazy('accounts:login')

    # prevents signed in user from signing up
    def dispatch(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('/')
        return super().dispatch(*args, **kwargs)


class AccountUpdateView(LoginRequiredMixin, UpdateView):
    """
    View and change account information
    """
    template_name = 'accounts/account_update.html'
    form_class = UserUpdateForm
    success_url = reverse_lazy('accounts:detail')

    def get_object(self):
        return self.request.user


class LoginView(FormView):
    """
    Login user
    """
    template_name = 'accounts/account_login.html'
    form_class = LoginForm
    success_url = '/'
