from django.contrib import admin
from .models import Product, Category


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity', 'featured', )
    list_filter = ('name', 'price', 'quantity', 'featured', )
    list_editable = ('price', 'quantity', )

    # sets up slug to be generated from product name
    prepopulated_fields = {'slug': ('name', )}


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', )
    list_display_links = ('name', )


admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)