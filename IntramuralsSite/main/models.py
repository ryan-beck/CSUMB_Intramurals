from django.db import models

class Account(models.Model):
    email = models.TextField(unique=True)
    display_name = models.TextField()
    photo_url = models.TextField()
    is_admin = models.BooleanField(default=False) 

class Sport(models.Model):
    sport_name = models.TextField()
    logo_url = models.TextField()
    is_active = models.BooleanField()

class League(models.Model):
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    league_name = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    # registration dates:
    reg_start_date = models.DateField()
    reg_end_date = models.DateField()

class Team(models.Model):
    team_name = models.TextField(default="My Team")
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    players = models.ManyToManyField(Account)

class Game(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    start_time = models.DateField()
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)

