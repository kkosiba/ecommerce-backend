# all relavant mixins go here

from products.models import Category

class DisplayCategoriesMixin(object):
    """
    Simple mixin adding 'categories' to context in selected views
    """
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        # context['categories_with_parent'] = Category.objects.exclude(
        #                                             parent__isnull=False)
        return context
