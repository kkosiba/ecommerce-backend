from django.db import models

from products.models import Product


class CartItem(models.Model):
    """
    Contains information about each product in a cart
    """
    cart_id = models.CharField(max_length=50)

    date_added = models.DateTimeField(auto_now_add=True)

    product = models.ForeignKey(Product,
                                unique=False,
                                on_delete=models.CASCADE)

    quantity = models.IntegerField(default=1)

    class Meta:
        ordering = ('date_added', )

    @property
    def total(self):
        return self.quantity * self.product.price

    @property
    def name(self):
        return self.product.name

    @property
    def price(self):
        return self.product.price

    def get_absolute_url(self):
        return self.product.get_absolute_url()

    def increase_product_quantity(self, quantity):
        self.quantity += quantity
        self.save()
        return self.quantity
