from django.urls import path

from . import views

urlpatterns = [
    path('getSports/', views.getSportsList, name='getSports'),
    path('getLeagues/', views.getLeagueList, name='getLeague'),
    path('getTeams/', views.getTeamList, name='getTeam'),
    path('getEventsByUser/<str:userId>/', views.getEventsByUser, name='getEventsByUser'),
    path('getAccountByEmail/<str:email>/', views.getAccountByEmail, name='getAccountByEmail'),
    path('joinTeam/', views.join_team, name='join_team'),
    path('leaveTeam/', views.leave_team, name='leave_team'),
    path('createAccount/', views.createAccount, name='createAccount'),
    path('createSport/', views.create_sport, name='createSport'),
    path('createLeague/', views.create_league, name='createLeague'),
    path('getTeamsByLeague/<str:sport>/<str:league>/', views.getTeamsByLeague, name='GetLeagueByTeam'),
    path('getAccounts/',views.getAccounts),
]
