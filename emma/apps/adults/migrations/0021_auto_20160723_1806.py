# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-23 23:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adults', '0020_adultaddress_adult_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='adultaddress',
            name='google_maps_link',
            field=models.TextField(default='asdas', verbose_name='Google Maps Link'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='adult_name',
            field=models.CharField(max_length=50, verbose_name='Adult Name'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='city',
            field=models.CharField(max_length=50, verbose_name='City'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='colony',
            field=models.CharField(max_length=50, verbose_name='Colony'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='interior_number',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Interior Number'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='municipality',
            field=models.CharField(max_length=50, verbose_name='Municipality'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='outdoor_number',
            field=models.CharField(max_length=25, verbose_name='Outdoor Number'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='postal_code',
            field=models.PositiveIntegerField(verbose_name='Postal Code'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='reference',
            field=models.TextField(verbose_name='Reference'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='state',
            field=models.CharField(max_length=50, verbose_name='State'),
        ),
        migrations.AlterField(
            model_name='adultaddress',
            name='street',
            field=models.CharField(max_length=50, verbose_name='Street'),
        ),
    ]