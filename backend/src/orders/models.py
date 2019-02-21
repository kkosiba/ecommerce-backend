from django.db import models
from django.contrib.auth import get_user_model

# from carts.models import Cart
# from addresses.models import BillingAddress, DeliveryAddress
User = get_user_model()

# Create your models here.

ORDER_STATUS = (
    ('placed', 'Placed'),
    ('paid', 'Paid'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered')
)

class Order(models.Model):
    status = models.CharField(max_length=120,
                              choices=ORDER_STATUS,
                              default='created')
                              
    # cart = models.ForeignKey(Cart,
    #                          on_delete=models.PROTECT)

    user = models.ForeignKey(User,
                             on_delete=models.PROTECT)

    # billing_address = models.ForeignKey(BillingAddress, 
    #                                     on_delete=models.PROTECT,
    #                                     related_name='billing_address',
    #                                     null=True)

    # shipping_address = models.ForeignKey(DeliveryAddress,
    #                                      on_delete=models.PROTECT,
    #                                      related_name='shipping_address',
    #                                      null=True)

    shipping_total_price = models.DecimalField(max_digits=50,
                                               decimal_places=2,
                                               default=5.00)

    order_total = models.DecimalField(max_digits=50,
                                      decimal_places=2)

    order_id = models.CharField(max_length=20,
                                null=True,
                                blank=True)

    @property
    def is_completed(self):
        return True if self.status == "paid" else False
