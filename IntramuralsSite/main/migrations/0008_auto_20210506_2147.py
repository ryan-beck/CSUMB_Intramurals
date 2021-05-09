# Generated by Django 3.1.6 on 2021-05-06 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_merge_20210506_2139'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='is_open',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='team',
            name='player_limit',
            field=models.IntegerField(null=True),
        ),
    ]