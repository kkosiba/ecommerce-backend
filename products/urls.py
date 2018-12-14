from django.urls import path

from .views import (
    ProductListView,
    ProductCreateView,
    ProductSearchView,
    ProductByTag,
    ProductByCategory,
    ProductDetailView,
    ProductDeleteView,
    ProductUpdateView, )

app_name = 'products'

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('add/', ProductCreateView.as_view(), name='product_add'),
    path('search/', ProductSearchView.as_view(), name='product_search'),
    # to be implemented...
    path('tag/<str:tag>/', ProductByTag.as_view(), name='product_by_tag'),
    path('category/<str:name>/', ProductByCategory.as_view(),
         name='product_by_category'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product_details'),
    path('<int:pk>/delete/', ProductDeleteView.as_view(),
         name='product_delete'),
    path('<int:pk>/update/', ProductUpdateView.as_view(),
         name='product_update'),
]
