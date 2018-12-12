from django.db import models
from django.urls import reverse

# Create your models here.

class Category(models.Model):
    name         = models.CharField(max_length=100,
                                    unique=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('products:category', kwargs={'name': self.name})


class Product(models.Model):
    category     = models.ManyToManyField(Category,
                                          blank=False)
    name         = models.CharField(max_length=150,
                                    default='Empty name.')
    description  = models.TextField(default='Empty description.')
    price        = models.DecimalField(decimal_places=2,
                                       max_digits=20,
                                       default=0)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('products:products_detail', kwargs={'pk': self.pk})
