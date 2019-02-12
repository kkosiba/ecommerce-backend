from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class DeliveryAddress(models.Model):
    owner           = models.ForeignKey(User, on_delete=models.PROTECT)
    address_name    = models.CharField(max_length=120)
    address_line_1  = models.CharField(max_length=120)
    address_line_2  = models.CharField(max_length=120, null=True, blank=True)
    country         = models.CharField(max_length=120, default='United Kingdom')
    city            = models.CharField(max_length=120)
    postcode        = models.CharField(max_length=120)

    def __str__(self):
        return self.address_name


class BillingAddress(models.Model):
    owner           = models.ForeignKey(User, on_delete=models.PROTECT)
    address_name    = models.CharField(max_length=120)
    address_line_1  = models.CharField(max_length=120)
    address_line_2  = models.CharField(max_length=120, null=True, blank=True)
    country         = models.CharField(max_length=120, default='United Kingdom')
    city            = models.CharField(max_length=120)
    postcode        = models.CharField(max_length=120)

    def __str__(self):
        return self.address_name
