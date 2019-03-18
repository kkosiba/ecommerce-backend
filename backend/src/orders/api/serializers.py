from rest_framework import serializers
from orders.models import Order

class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format='%a, %d %b  %I:%M %p',
                                           read_only=True)
    class Meta:
        model = Order
        fields = '__all__'