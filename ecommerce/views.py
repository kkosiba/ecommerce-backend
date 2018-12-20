from django.views.generic.base import TemplateView

class MainTemplateView(TemplateView):
    template_name = 'ecommerce/index.html'


class AboutTemplateView(TemplateView):
    template_name = 'ecommerce/about.html'


class ContactTemplateView(TemplateView):
    template_name = 'ecommerce/contact.html'
