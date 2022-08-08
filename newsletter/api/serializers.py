from rest_framework import serializers

from newsletter.models import Subscriber


class SubscriberSerializer(serializers.ModelSerializer):
    joined_date = serializers.DateTimeField(
        format="%a, %d %b  %I:%M %p", read_only=True
    )

    class Meta:
        model = Subscriber
        fields = "__all__"
