from django.db import models
from django.shortcuts import reverse
# from ckeditor_uploader.fields import RichTextUploadingField
# from django_ckeditor_5.fields import CKEditor5Field
from django.utils import timezone

class Setting(models.Model):
    name = models.CharField(max_length=25)
    title = models.CharField(max_length=25)
    email = models.EmailField(max_length=40)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=100, blank=True)
    logo = models.ImageField(upload_to='img', blank=True)
    meta_description = models.TextField(blank=True, null=True)



    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse("cp:system_settings", args=[self.pk])
