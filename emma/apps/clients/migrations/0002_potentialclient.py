# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-14 03:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PotentialClient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('email', models.EmailField(max_length=254)),
                ('source', models.CharField(max_length=55)),
            ],
            options={
                'verbose_name': 'Potential client',
                'verbose_name_plural': 'Potential clients',
            },
        ),
    ]
