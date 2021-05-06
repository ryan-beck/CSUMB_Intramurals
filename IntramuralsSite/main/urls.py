from django.urls import path

from . import views

urlpatterns = [
    path('getSports/', views.getSportsList, name='getSports'),
    path('getLeagues/', views.getLeagueList, name='getLeague'),
    path('getPosts/', views.getPosts, name='getPosts'),
    path('getEventsByUser/<str:userId>/', views.getEventsByUser, name='getEventsByUser'),
    path('getAccountByEmail/<str:email>/', views.getAccountByEmail, name='getAccountByEmail'),
    path('getTeamsByUser/<str:userId>/', views.getTeamsByUser, name='getTeamsByUser'),
    # path('joinTeam/', views.join_team, name='join_team'),
    path('createAccount/', views.createAccount, name='createAccount'),
    path('createSport/', views.create_sport, name='createSport'),
    path('createLeague/', views.create_league, name='createLeague'),
    path('createPost/', views.create_post, name='createPost'),
    path('deletePost/<str:postId>/', views.deletePost, name='deletePost'),
    path('editPost/<str:postId>/', views.editPost, name='editPost'),
    path('generateGameSchedule/', views.generateGameSchedule, name='generateGameSchedule'),
]
