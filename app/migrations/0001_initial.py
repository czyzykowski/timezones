# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Timezone',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('time_difference', models.FloatField(help_text=b'Difference to GMT time')),
                ('owner', models.ForeignKey(related_name='timezones', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('time_difference',),
            },
        ),
    ]
