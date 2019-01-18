from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.name
    