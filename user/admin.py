from django.utils.translation import gettext, gettext_lazy as _
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserProfile

# Register your models here.
# admin.site.register(UserProfile)
@admin.register(UserProfile)
class CustomUserAdmin(BaseUserAdmin):
    """ Custom user admin."""

    fieldsets = (
        (None, {'fields': ('password',)}),
                (_('Personal info'), {'fields': (
                    'username', 'email', 'first_name', 'last_name',)}),
                (_('Additional info'), {'fields': (
                    'date_of_birth', 'gender', 'phone_number', 'photo',)}),
                (_('Permissions'), {
                    'fields': (
                    'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
                }),
                (_('Important dates'), {'fields': (
                    'last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2',)
        }),
    )

    # exclude = ['__all__']
    ordering = ['email', 'first_name', 'last_name']
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    filter_horizontal = ('groups', 'user_permissions',)
