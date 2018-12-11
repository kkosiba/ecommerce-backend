from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy


from .views import SignUp

app_name = 'accounts'

urlpatterns = [
    path('login/', 
        auth_views.LoginView.as_view(), 
        name='login'),

    path('logout/', 
        auth_views.LogoutView.as_view(), 
        name='logout'),
    
    path('password_change/',
        auth_views.PasswordChangeView.as_view(
            success_url=reverse_lazy('accounts:password_change_done')),
        name='password_change'),
    
    path('password_change_done/',
        auth_views.PasswordChangeDoneView.as_view(),
        name='password_change_done'),
    
    path('password_reset/',
        auth_views.PasswordResetView.as_view(
            success_url=reverse_lazy('accounts:password_reset_done')),
        name='password_reset'),

    path('password_reset_done/',
        auth_views.PasswordResetDoneView.as_view(),
        name='password_reset_done'),

    path('password_reset_confirm/',
        auth_views.PasswordResetConfirmView.as_view(
            success_url=reverse_lazy('accounts:password_reset_complete')),
        name='password_reset_done'),

    path('password_reset_complete/',
        auth_views.PasswordResetCompleteView.as_view(),
        name='password_reset_complete'),

    path('signup/', SignUp.as_view(), name='signup'),
]