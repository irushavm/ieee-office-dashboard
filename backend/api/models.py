from django.db import models
from enum import Enum


class APIKeyProvider(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    api_key = models.TextField()
    api_id = models.TextField(blank=True)

    class Meta:
        ordering = ('created',)

class DashboardConfigType(Enum):
    layout = 'layout'
    service = 'service'
    tile = 'tile'

class DashboardConfig(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    config_type = models.CharField(
        max_length=7,
        choices=[(tag.name, tag.value) for tag in DashboardConfigType]
    )
    config = models.TextField()

    class Meta:
        ordering = ('created',)
