from django.db import models

# Create your models here.

class Product(models.Model):
    name         = models.CharField(max_length=150,
                                    default='Empty name.')
    description  = models.TextField(default='Empty description.')
    price        = models.DecimalField(decimal_places=2,
                                       max_digits=20,
                                       default=0)
