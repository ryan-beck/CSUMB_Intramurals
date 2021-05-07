from django.db import models

class Account(models.Model):
    email = models.TextField(unique=True)
    display_name = models.TextField()
    photo_url = models.TextField()
    is_admin = models.BooleanField(default=False) 

    def __str__(self):
        return self.email + " (" + str(self.id) + ")"
    

class Sport(models.Model):
    sport_name = models.TextField()
    logo_url = models.TextField(default="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HuOqn7QL9Gw7vHAzolIJzgHaHa%26pid%3DApi&f=1")
    is_active = models.BooleanField()

    def __str__(self):
        return self.sport_name + " (" + str(self.id) + ")"
    

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
        return self.sport.sport_name +": "+ self.league_name + " (" + str(self.id) + ")"
    

class Team(models.Model):
    team_name = models.TextField(default="My Team")
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    players = models.ManyToManyField(Account)
    is_open = models.BooleanField()
    captain = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="Captain", null=True)
    def __str__(self):
        return self.team_name + " (" + str(self.id) + ")"
    

class Game(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)

    def __str__(self):
        return " ".join(str(self.league).split()[:2]) + ": " + self.home_team.team_name + " vs. " + self.away_team.team_name + " " + str(self.start_time)


class Post(models.Model):
    text = models.TextField(blank=True)
    media_url = models.TextField(blank=True)
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    posted_date = models.DateTimeField()
