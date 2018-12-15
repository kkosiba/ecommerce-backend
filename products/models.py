from django.db import models
from django.urls import reverse

from django.contrib.auth.models import User

# tags
from taggit.managers import TaggableManager


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
    tags         = TaggableManager(blank=True) # tags mechanism
    name         = models.CharField(max_length=150,
                                    default='Empty name.')
    description  = models.TextField(default='Empty description.')
    picture      = models.ImageField(upload_to='products/images',
                                     null=True,
                                     blank=True)
    price        = models.DecimalField(decimal_places=2,
                                       max_digits=20,
                                       default=0)
    owner        = models.ForeignKey(User,
                                     on_delete=models.CASCADE,
                                     related_name='products')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('products:products_detail', kwargs={'pk': self.pk})
