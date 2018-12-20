from django.contrib import admin
from django.urls import path, include

from django.contrib.auth.views import (
    LogoutView,
    PasswordChangeView,
    PasswordChangeDoneView,
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView, )

from django.urls import reverse_lazy


from .views import (
    AccountDetailView,
    AccountCreateView,
    AccountUpdateView,
    LoginView, )

app_name = 'accounts'

urlpatterns = [
    path('register/',
         AccountCreateView.as_view(),
         name='register'),

    path('login/',
         LoginView.as_view(),
         name='login'),

    path('logout/',
         LogoutView.as_view(
            template_name='accounts/account_logout.html'),
         name='logout'),

    path('details/',
         AccountDetailView.as_view(),
         name='details'),

    path('password_change/',
         PasswordChangeView.as_view(
            template_name='accounts/password_change_form.html',
            success_url=reverse_lazy('accounts:password_change_done')),
         name='password_change'),

    path('password_change_done/',
         PasswordChangeDoneView.as_view(
            template_name='accounts/password_change_done.html'),
         name='password_change_done'),

    path('password_reset/',
         PasswordResetView.as_view(
            template_name='accounts/password_reset_form.html',
            email_template_name='accounts/password_reset_email.html',
            subject_template_name='accounts/password_reset_subject.txt',
            success_url=reverse_lazy('accounts:password_reset_done')),
         name='password_reset'),

    path('password_reset_done/',
         PasswordResetDoneView.as_view(
            template_name='accounts/password_reset_done.html'),
         name='password_reset_done'),

    path('password_reset_confirm/',
         PasswordResetConfirmView.as_view(
            template_name='accounts/password_reset_confirm.html',
            success_url=reverse_lazy('accounts:password_reset_complete')),
         name='password_reset_done'),

    path('password_reset_complete/',
         PasswordResetCompleteView.as_view(
            template_name='accounts/password_reset_complete.html'),
         name='password_reset_complete'),
]
