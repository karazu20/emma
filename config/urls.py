#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views import defaults as error_views
from django.contrib.sitemaps.views import sitemap

from emma.apps.landing import urls as landing_urls
from emma.apps.xauth import urls as xauth_urls
from emma.apps.services import urls as services_urls
from emma.apps.suscriptions import urls as suscription_urls
from emma.apps.adults import urls as adult_urls
from emma.apps.clients import urls as clients_urls
from emma.apps.emmas import urls as emmas_urls
from emma.core.sitemaps import StaticViewSitemap
from emma.apps.admins import urls as admins_urls

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'session_security/', include('session_security.urls')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),

    # Custom urls
    # url(r'', include(module_urls, namespace='module')),
    url(r'', include(landing_urls, namespace='landing')),
    url(r'', include(xauth_urls, namespace='xauth')),
    url(r'', include(services_urls, namespace='services')),
    url(r'', include(suscription_urls, namespace='suscriptions')),
    url(r'', include(adult_urls, namespace='adults')),
    url(r'', include(clients_urls, namespace='clients')),
    url(r'', include(emmas_urls, namespace='emmas')),
    url(r'', include(admins_urls, namespace='admins')),
]

if settings.DEBUG:
    import debug_toolbar
    # This allows the error pages to be debugged during development, visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
       url(r'^__debug__/', include(debug_toolbar.urls)),
        url(r'^400/$', error_views.bad_request, kwargs={
            'exception': Exception("Bad Request!")}),
        url(r'^403/$', error_views.permission_denied, kwargs={
            'exception': Exception("Permission Denied")}),
        url(r'^404/$', error_views.page_not_found, kwargs={
            'exception': Exception("Page not Found")}),
        url(r'^500/$', error_views.server_error),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
