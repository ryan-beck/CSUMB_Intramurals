# Generated by Django 3.1.7 on 2021-04-26 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='media_url',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='text',
            field=models.TextField(blank=True),
        ),
    ]
