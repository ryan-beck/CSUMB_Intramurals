# Generated by Django 3.1.7 on 2021-04-27 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20210426_2121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='start_time',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='posted_date',
            field=models.DateTimeField(),
        ),
    ]
