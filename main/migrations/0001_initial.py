# Generated by Django 3.1.6 on 2021-05-14 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.TextField(unique=True)),
                ('display_name', models.TextField()),
                ('photo_url', models.TextField()),
                ('is_admin', models.BooleanField(default=False)),
                ('wins', models.IntegerField(default=0)),
                ('losses', models.IntegerField(default=0)),
                ('ties', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('league_name', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('player_limit', models.IntegerField(null=True)),
                ('reg_start_date', models.DateField()),
                ('reg_end_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Sport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sport_name', models.TextField()),
                ('logo_url', models.TextField(default='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HuOqn7QL9Gw7vHAzolIJzgHaHa%26pid%3DApi&f=1')),
                ('is_active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_name', models.TextField(default='My Team', max_length=16)),
                ('wins', models.IntegerField(default=0)),
                ('losses', models.IntegerField(default=0)),
                ('ties', models.IntegerField(default=0)),
                ('is_open', models.BooleanField()),
                ('password', models.TextField(blank=True, max_length=16, null=True)),
                ('captain', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Captain', to='main.account')),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.league')),
                ('players', models.ManyToManyField(to='main.Account')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True)),
                ('media_url', models.TextField(blank=True)),
                ('posted_date', models.DateTimeField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.account')),
            ],
        ),
        migrations.AddField(
            model_name='league',
            name='sport',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sport'),
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('home_score', models.IntegerField(null=True)),
                ('away_score', models.IntegerField(null=True)),
                ('away_team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_team', to='main.team')),
                ('home_team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_team', to='main.team')),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.league')),
            ],
        ),
    ]