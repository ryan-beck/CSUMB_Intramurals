from django.contrib import admin
from .models import Account, Sport, League, Team, Game

admin.site.register(Account)
admin.site.register(Sport)
admin.site.register(League)
admin.site.register(Team)
admin.site.register(Game)
