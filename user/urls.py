from django.urls import path

from .views import (
	home, profile, get_user
	)


app_name = "user"


urlpatterns = [
	path('', home, name="home"),
	path('get_user/', get_user, name="get_user"),
	path('user/<slug:username>', profile, name='profile'),

]
