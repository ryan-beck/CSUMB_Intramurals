from django.db import models

class Account(models.Model):
    email = models.TextField(unique=True)
    display_name = models.TextField()
    photo_url = models.TextField()
    is_admin = models.BooleanField(default=False) 

    def __str__(self):
        return self.email
    

class Sport(models.Model):
    sport_name = models.TextField()
    logo_url = models.TextField()
    is_active = models.BooleanField()

    def __str__(self):
        return self.sport_name
    

class League(models.Model):
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    league_name = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    # registration dates:
    # TODO: maybe add constraints on these dates
    reg_start_date = models.DateField()
    reg_end_date = models.DateField()

    def __str__(self):
        return self.league_name
    

class Team(models.Model):
    team_name = models.TextField(default="My Team")
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    players = models.ManyToManyField(Account)

    def __str__(self):
        return self.team_name
    

class Game(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    start_time = models.DateField()
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)

