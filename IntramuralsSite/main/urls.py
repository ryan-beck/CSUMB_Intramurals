from django.urls import path

from . import views

urlpatterns = [
    path('getSports/', views.getSportsList, name='getSports'),
    path('getLeagues/', views.getLeagueList, name='getLeague'),
    path('getTeams/', views.getTeamList, name='getTeam'),
    path('getPosts/', views.getPosts, name='getPosts'),
    path('getEventsByLeague/<str:leagueId>', views.getEventsByLeague, name='getEventsByLeague'),
    path('getEventsByUser/<str:userId>/', views.getEventsByUser, name='getEventsByUser'),
    path('getAccountByEmail/<str:email>/', views.getAccountByEmail, name='getAccountByEmail'),
    path('getWinLossByUser/<str:userId>/', views.getWinLossByUser, name='getWinLossByUser'),
    # path('getTeamsByUser/<str:userId>/', views.getTeamsByUser, name='getTeamsByUser'),
    path('getProfileInfoByUser/<str:userId>/', views.getProfileInfoByUser, name='getProfileInfoByUser'),
    path('getProfilePastInfoByUser/<str:userId>/', views.getProfilePastInfoByUser, name='getProfilePastInfoByUser'),
    # path('joinTeam/', views.join_team, name='join_team'),
    path('joinTeam/', views.join_team, name='join_team'),
    path('leaveTeam/', views.leave_team, name='leave_team'),
    path('createAccount/', views.createAccount, name='createAccount'),
    path('createSport/', views.create_sport, name='createSport'),
    path('createLeague/', views.create_league, name='createLeague'),
    path('getTeamsByLeague/<str:leagueId>/', views.getTeamsByLeague, name='GetLeagueByTeam'),
    path('getAccounts/',views.getAccounts),
    path('createPost/', views.create_post, name='createPost'),
    path('deletePost/<str:postId>/', views.deletePost, name='deletePost'),
    path('editPost/<str:postId>/', views.editPost, name='editPost'),
    path('generateGameSchedule/', views.generateGameSchedule, name='generateGameSchedule'),
    path('createTeam/', views.createTeam, name='createTeam'),
    path('getLeagueById/<str:leagueId>/', views.getLeagueById, name='getLeagueById'),
    path('getSportById/<str:sportId>/', views.getSportById, name='getSportById'),
    path('getPlayersByTeamId/<str:teamId>/', views.getPlayersByTeamId, name='getPlayersByTeamId'),
    path('getTeamById/<str:teamId>/', views.getTeamById, name='getTeamById'),
    path('getGamesByTeam/<str:teamId>/', views.getGamesByTeam, name='getGamesByTeam'),
    path('deleteTeam/<str:teamId>/', views.deleteTeam, name='deleteTeam'),
    path('updateScores/<str:leagueId>', views.updateScores, name='updateScores'),
    path('editPlayers/<str:teamId>/', views.editPlayers, name='editPlayers'),

]
