import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Account, Team, League
from .serializers import LeagueSerializer, SportSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Sport, Game

from .serializers import *

def index(request):
    return HttpResponse("Index page for website")

@api_view(['POST'])
def join_team(request):
    user_id = request.data['user_id']
    team_id = request.data['team_id']
    user_account = Account.objects.get(id=user_id)
    team = Team.objects.get(id=team_id)
    team.players.add(user_account)
    team.save()
    return HttpResponse('Successfully joined team')

@api_view(['POST'])
def create_sport(request):
	serializer = SportSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def create_league(request):
	serializer = LeagueSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def createAccount(request):
	body = json.loads(request.body.decode('utf-8'))
	email = body["email"]
	if not Account.objects.filter(email=email).exists():
		serializer = AccountSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
		return Response(serializer.data)
	return JsonResponse({'status': 'ok'})

@api_view(['GET'])
def getSportsList(request):
    data = Sport.objects.all()

    sports = SportSerializer(data, context={'request': request}, many=True)

    return Response(sports.data)

@api_view(['GET'])
def getLeagueList(request):
    data = League.objects.all()

    leagues = LeagueSerializer(data, context={'request': request}, many=True)

    return Response(leagues.data)

@api_view(['GET'])
def getAccountByEmail(request, email):
	account = Account.objects.get(email=email)
	serializer = AccountSerializer(instance=account)
	return Response(serializer.data)

@api_view(['POST'])
def generateGameSchedule(request):
	leagueId = request.data['leagueId']
	gameNum = request.data['gameNum']
	
	teams = list(Team.objects.filter(league=leagueId))
	games = generateSchedule(teams, gameNum)
	for game in games:
		print(game)
	return HttpResponse("games generated")


def generateSchedule(teams, gameNum):
        # how many games (gameNum)

        # what days / times will games be played
        # how long will each game last
		# how to determine home/away
        # what location will the game be played
		

		if len(teams) % 2 != 0:
			teams.append(None)
		games = []
		
		for i in range(gameNum):
			matrix = [teams[:len(teams)//2], teams[len(teams)//2:][::-1]]
			for j in range(len(matrix[0])):
				if matrix[0][j] != None and matrix[1][j] != None:
					game = Game(league=teams[0].league, 
								start_time="2021-10-18",
								home_team=matrix[0][j],
								away_team=matrix[1][j])
					games.append(game)
			
			teams = [teams[0]] + [teams[-1]] + teams[1:-1]
		return games

	