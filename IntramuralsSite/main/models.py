from django.db import models

class Account(models.Model):
    email = models.TextField(unique=True)
    display_name = models.TextField()
    photo_url = models.TextField()
    is_admin = models.BooleanField(default=False)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    ties = models.IntegerField(default=0)

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
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    ties = models.IntegerField(default=0)

    def __str__(self):
        return self.team_name + " (" + str(self.id) + ")"

    def __gt__(self, other):
        thisWinPrct = self.wins / (self.wins + self.losses + self.ties)
        otherWinPrct = other.wins / (other.wins + other.losses + other.ties)
        if thisWinPrct != otherWinPrct:
            return thisWinPrct > otherWinPrct
        
        thisHome = Game.objects.filter(home_team=self, away_team=other)
        thisAway = Game.objects.filter(home_team=other, away_team=self)
        
        thisWins = 0
        otherWins = 0
        for game in thisHome:
            if game.home_score > game.away_score:
                thisWins += 1
            elif game.home_score < game.away_score:
                otherWins += 1
        for game in thisAway:
            if game.home_score > game.away_score:
                otherWins += 1
            elif game.home_score < game.away_score:
                thisWins += 1
        if thisWins != otherWins:
            return thisWins > otherWins

        thisScore = 0
        otherScore = 0
        for game in thisHome:
            thisScore += game.home_score
            otherScore += game.away_score
        for game in thisAway:
            thisScore += game.away_score
            otherScore += game.home_score
        return thisScore > otherScore

    

class Game(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)

    def __str__(self):
        return " ".join(str(self.league).split()[:2]) + ": " + self.home_team.team_name + " vs. " + self.away_team.team_name + " " + str(self.start_time)

