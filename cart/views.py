from django.shortcuts import render

from django.views.generic.base import View, TemplateView
from django.views.generic.edit import UpdateView

from django.contrib.auth.mixins import (
    LoginRequiredMixin, )
    # UserPassesTestMixin,
    # PermissionRequiredMixin, )

from .models import Cart
from products.models import Product


# Create your views here.
class CartTemplateView(TemplateView):
    template_name = 'cart/cart_view.html'


class CartUpdateView(UpdateView):
    pass


class CartCheckoutView(LoginRequiredMixin, View):
    pass
