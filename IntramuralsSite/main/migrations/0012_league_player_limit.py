# Generated by Django 3.1.7 on 2021-05-07 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20210507_2145'),
    ]

    operations = [
        migrations.AddField(
            model_name='league',
            name='player_limit',
            field=models.IntegerField(null=True),
        ),
    ]