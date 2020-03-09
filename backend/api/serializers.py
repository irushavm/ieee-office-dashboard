from rest_framework import serializers
from api.models import APIKeyProvider, DashboardConfig


class APIKeyProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIKeyProvider
        fields = ('name', 'api_id', 'api_key')


class DashboardConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardConfig
        fields = ('config', 'config_type')