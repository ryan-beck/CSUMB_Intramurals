from django.urls import path

from . import views

urlpatterns = [
    # path('joinTeam/', views.join_team, name='join_team'),
    path('createSport/', views.create_sport, name='createSport'),
    path('createLeague/', views.create_league, name='createLeague'),
    path('login/', views.login, name='login'),
    path('testLogin/', views.testLogin, name='testLogin'),
]
