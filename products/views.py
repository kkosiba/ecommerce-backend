from django.shortcuts import render

from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.views.generic.edit import (
    CreateView, DeleteView, UpdateView, FormView)

from django.contrib.auth.mixins import (
    LoginRequiredMixin, UserPassesTestMixin, PermissionRequiredMixin)

from .models import Product
from .forms import ProductForm

from django.db.models import Q



# Create your views here.

class ProductListView(ListView):
    model               = Product
    template_name       = 'products/products_list.html'
    context_object_name = 'products'
    paginate_by         = 10


class ProductDetailView(DetailView):
    model               = Product
    template_name       = 'products/products_detail.html'


# Create, delete and update product views
class ProductCreateView(PermissionRequiredMixin,
                        LoginRequiredMixin,
                        CreateView):
    form_class          = ProductForm
    permission_required = 'product.add_product'
    template_name       = 'products/product_form.html'

    # to process request.user in the form
    def form_valid(self, form):
        form.save(commit=False)
        form.instance.author = self.request.user
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        """
        To use ProductForm with 'Update' instead of 'Add' text in update view
        """
        context = super().get_context_data(**kwargs)
        context['update'] = False
        return context


class ProductDeleteView(LoginRequiredMixin,
                        UserPassesTestMixin,
                        DeleteView):
    model               = Product
    success_url         = reverse_lazy('products:index')

    def test_func(self):
        """
        Only let the user delete object if they own the object being deleted
        """
        return self.get_object().owner.username == self.request.user.username


class ProductUpdateView(LoginRequiredMixin,
                        UserPassesTestMixin, 
                        UpdateView):
    model               = Product
    form_class          = ProductForm

    def test_func(self):
        """
        Only let the user update object if they own the object being updated

        """
        return self.get_object().owner.username == self.request.user.username

    def get_context_data(self, **kwargs):
        """
        To use ProductForm with 'Update' instead of 'Add' text in update view
        """
        context = super().get_context_data(**kwargs)
        context['update'] = True
        return context


class ProductSearchView(ListView):
    context_object_name = 'products'
    template_name       = 'products/products_search.html'
    paginate_by         = 10

    def get_queryset(self):
        search_query = self.request.GET.get('q', None)
        results = []
        if search_query:
            results = Product.objects.filter(
                Q(category__name__icontains=search_query) |
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query)).distinct()
        return results
