from django.urls import path

from .views import (
    index, guestview
)

app_name = "config"

urlpatterns = [
    path('', index, name="index"),
    path('guest/view/list/', guestview, name="guestview"),
]
