from django.urls import path

from . import views

urlpatterns = [
    # path('joinTeam/', views.join_team, name='join_team'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('testLogin/', views.testLogin, name='testLogin'),
]
