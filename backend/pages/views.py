from django.views.generic import TemplateView
from api.models import DashboardConfig
from api.serializers import DashboardConfigSerializer
from django.views import View
from django.shortcuts import render
from pages.forms import ConfigForm
import json

class HomePageView(TemplateView):
    template_name = 'home.html'


class PrivacyPageView(TemplateView):
    template_name = 'privacy.html'


class DashboardConfigView(View):
    form_class = ConfigForm
    template_name = 'config.html'

    def get(self, request, *args, **kwargs):
        config_type = request.GET['type']
        configObj = DashboardConfig.objects.filter(owner=self.request.user,config_type=config_type)
        if configObj.exists():
            config = configObj.first().config
        else:
            config = {}
        return render(request, self.template_name, context={'config': config})


    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            config_type = request.GET['type']
            config = json.dumps(json.loads(form.cleaned_data['config']), separators=(',', ':'))
            service_config = DashboardConfig.objects.filter(owner=self.request.user,config_type=config_type)
            if service_config.exists():
                service_config.update(config=config)
            else:
                service_config = DashboardConfig(owner=self.request.user, config=config, config_type=config_type)
                service_config.save()

        return render(request, self.template_name, context={'config': DashboardConfig.objects.filter(owner=self.request.user).first().config})




catchall = TemplateView.as_view(template_name='index.html')