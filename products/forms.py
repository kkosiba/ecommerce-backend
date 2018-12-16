from django import forms
from django.forms import (
    ModelForm,
    TextInput,
    Textarea,
    SelectMultiple,
    NumberInput, )

from .models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        exclude = ('owner', )
        widgets = {
            'name': TextInput(
                attrs={
                    'required': True,
                    'placeholder': 'Product name',
                    'class': 'form-control', }, ),
            'description': Textarea(
                attrs={
                    'required': True,
                    'placeholder': 'Product name',
                    'class': 'form-control', }, ),
            'category': SelectMultiple(
                attrs={
                    'required': True,
                    'class': 'form-control', }, ),
            'price': NumberInput(
                attrs={
                    'required': True, }, ),
        }

    def save(self, commit=True):
        instance = super().save(commit=False)

        if commit:
            instance.save()
            self.save_m2m()
        return instance
