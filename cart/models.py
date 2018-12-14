from django.db import models

from products.models import Product
from django.contrib.auth.models import User

# Create your models here.

class Cart(models.Model):
    customer  = models.ForeignKey(User,
                                    null=True,
                                    blank=True)
    products  = models.ManyToManyField(Product,
                                      blank=True)
    total     = models.DecimalField(default=0.00,
                                    max_digits=100,
                                    decimal_places=2)
    
    def __str__(self):
        return str(self.id)
