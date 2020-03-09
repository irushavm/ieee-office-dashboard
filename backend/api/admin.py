from django.contrib import admin

from api.models import APIKeyProvider, DashboardConfig

class APIKeyProviderAdmin(admin.ModelAdmin):
    list_display = ('name', )


class DashboardConfigAdmin(admin.ModelAdmin):
    list_display = ('owner', 'config_type', )

admin.site.register(APIKeyProvider, APIKeyProviderAdmin)

admin.site.register(DashboardConfig, DashboardConfigAdmin)