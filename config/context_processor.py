from django.utils.functional import SimpleLazyObject
from django.shortcuts import get_object_or_404
from .models import Setting

import datetime


def setting(request):
    """Context processor function for global template content display."""
    try:
        settings = Setting.objects.get(name='Default')
    except Exception as e:
        settings = None

    return {
            'config':settings,
            'request':request,
    }
