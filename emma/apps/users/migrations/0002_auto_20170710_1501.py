# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-07-10 20:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cooluser',
            name='user_type',
            field=models.CharField(choices=[(b'emma', b'Emma'), (b'client', b'Client'), (b'admin', b'admin')], default=b'client', max_length=20, verbose_name='User type'),
        ),
    ]