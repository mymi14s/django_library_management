import json
from datetime import date, datetime
# from slugify import slugify as slugit
from django.shortcuts import reverse
from django.utils import timezone
from django.db import models
from django.core.serializers import serialize
from phone_field import PhoneField
from django.http import JsonResponse
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)

from .utils import (
    json_serial, photo_url_filter,
    upload_status_image,
)
# Create your models here.


class UserProfileManager(BaseUserManager):
    """Helps django work with our custom user manager."""

    def create_user(
        self, username, email, first_name, last_name,
        # date_of_birth, gender,
        # phone_number, photo,
        password=None):
        """Create a new user profile object."""
        if not email:
            raise ValueError('Users must have an email address')

        # if not username:
        #     raise ValueError('There must be a have an ID')

        username = email
        email =self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name)
        user.is_staff = False
        user.is_active = True
        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, first_name, last_name, password):
        """Create and saves a new super user password."""

        user = self.create_user(username=username, email=email, first_name=first_name, last_name=last_name, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True

        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represent user profiles."""
    GENDER = (
        ('Female', 'Female'),
        ('Male', 'Male'),
        ('Unspecified', 'Unspecified'),
    )
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True, help_text="eg: 2020-01-23")
    gender = models.CharField(max_length=11, choices=GENDER, blank=True, null=True)
    phone_number = PhoneField(help_text='format: (415) 123-1233', blank=True, null=True)
    photo = models.ImageField(upload_to=upload_status_image, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserProfileManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email',] # 'date_of_birth', 'gender', 'phone_number', 'photo',]

    # def save(self, *args, **kwargs):
    #
    #     return super().save(*args, **kwargs)

    def get_full_name(self):
        """Used to get users full name."""
        if self.middle_name == None:
            return f"{self.first_name} {self.last_name}"
        return f"{self.first_name} {self.middle_name} {self.last_name}"


    def get_user_profile(self):
        """Get full user information."""
        profile = json.loads(serialize("json", [self]))[0].get('fields')
        del profile['password']
        return profile

    def set_password_update(self, password):
        self.set_password(password)
        self.save()

    # def get_absolute_url(self):
    #     return reverse("user:profile", args=[self.username])

    def __str__(self):
        """Django uses this to convert an object to a string."""
        return self.email
