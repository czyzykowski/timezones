from django.contrib import admin

from app.models import Timezone


class TimezoneAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'owner', 'display_time_difference')

    def display_time_difference(self, timezone):
        if timezone.time_difference > 0:
            return '+{}'.format(timezone.time_difference)
        else:
            return timezone.time_difference
    display_time_difference.short_description = 'Time difference'


admin.site.register(Timezone, TimezoneAdmin)
