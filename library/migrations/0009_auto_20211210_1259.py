# Generated by Django 3.1 on 2021-12-10 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0008_auto_20211210_1255'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booktransaction',
            name='status',
        ),
        migrations.AddField(
            model_name='booktransaction',
            name='docstatus',
            field=models.CharField(choices=[('Draft', 'Draft'), ('Submitted', 'Submitted'), ('Cancelled', 'Cancelled')], default='Draft', max_length=12),
        ),
    ]
