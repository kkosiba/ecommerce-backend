from rest_framework import serializers

from addresses.models import BillingAddress, DeliveryAddress


class BillingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = BillingAddress
        fields = '__all__'


class DeliveryAddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DeliveryAddress
        fields = '__all__'
