#!/usr/bin/env python
# -*- coding: utf-8 -*-
import openpay
from django.template.response import TemplateResponse
from django.views.generic import ListView, View

from emma.apps.suscriptions.models import Charge, Suscription, History
from emma.core.mixins import ClientRequiredMixin


class ChargesList(ClientRequiredMixin, ListView):
    template_name = 'suscriptions/charges_list.html'
    model = Charge
    context_object_name = 'charges'

    def get_queryset(self):
        suscription = Suscription.objects.get(client=self.request.user.client)
        queryset = Charge.objects.filter(suscription=suscription)
        return queryset


class HistoryList(ClientRequiredMixin, ListView):
    template_name = 'suscriptions/history_list.html'
    model = History
    context_object_name = 'histories'

    def get_queryset(self):
        suscription = Suscription.objects.get(client=self.request.user.client)
        queryset = self.model.objects.filter(suscription=suscription)
        return queryset


class PaymentInfo(ClientRequiredMixin, View):
    template_name = 'suscriptions/payment_info.html'

    def get(self, request):
        suscription = Suscription.objects.get(client=self.request.user.client)
        customer = openpay.Customer.retrieve(suscription.id_customer)
        cards = customer.cards.all()

        ctx = {
            'cards': cards.data
        }
        return TemplateResponse(request, self.template_name, ctx)