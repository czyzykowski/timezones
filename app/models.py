from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.authtoken.models import Token


class Timezone(models.Model):
    owner = models.ForeignKey(User, related_name='timezones')
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    time_difference = models.FloatField(help_text='Difference to GMT time')

    class Meta:
        ordering = ('time_difference',)


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
