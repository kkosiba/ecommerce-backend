from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

User = get_user_model()

# Create your models here.

class Cart(models.Model):
    """
    To Be Implemented...
    """
    temporary_field = models.CharField(max_length=255)

    owner = models.OneToOneField(
        User,
        related_name="cart",
        on_delete=models.CASCADE,
        null=True)

    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    """
    To Be Implemented...
    """
    pass
