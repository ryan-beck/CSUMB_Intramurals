# Generated by Django 3.1.7 on 2021-05-07 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20210506_2107'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='player_limit',
        ),
        migrations.AddField(
            model_name='league',
            name='player_limit',
            field=models.IntegerField(null=True),
        ),
    ]
