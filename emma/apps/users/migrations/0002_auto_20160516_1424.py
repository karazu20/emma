# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-16 19:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='interior_number',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]
