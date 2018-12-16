from django.urls import path

from .views import (
    CartTemplateView,
    CartUpdateView,
    CartCheckoutView, )

app_name = 'cart'

urlpatterns = [
    path('', CartTemplateView.as_view(), name='cart_index'),
    path('update/', CartUpdateView.as_view(), name='cart_update'),
    path('checkout/', CartCheckoutView.as_view(), name='cart_checkout'),
]
