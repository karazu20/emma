#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.conf.urls import url

from . import views

urlpatterns = [

    url(regex='^contratar/informacion-servicio/$',
        view=views.ContractServiceInfo.as_view(),
        name='contract_service_info'),

]
