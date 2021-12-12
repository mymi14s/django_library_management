from django.contrib import admin
from .models import Setting

@admin.register(Setting)
class ConfigSetting(admin.ModelAdmin):
	list_display = ['name', 'title', 'email', 'phone']
