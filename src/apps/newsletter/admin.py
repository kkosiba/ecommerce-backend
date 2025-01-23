from django.contrib import admin

from .models import Subscriber


# Register your models here.
class SubscriberAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "joined_date",
    )


admin.site.register(Subscriber, SubscriberAdmin)
