from django.shortcuts import render

from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView

from .models import Cart
from products.models import Product


# Create your views here.
class CartTemplateView(TemplateView):
    template_name = 'carts/cart_view.html'


class CartUpdateView(UpdateView):
    pass