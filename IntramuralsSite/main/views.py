import json
import datetime
from numpy import argsort, array
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
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
	#number of total games to played throughout season
	gameNum = int(request.data['gameNum'])
	#int representing day of week, 0 Monday, 6 Sunday
	gameDay = int(request.data['gameDay'])
	#time that games will begin, in minutes
	startTime = request.data['startTime'].split(":")
	startTime = int(startTime[0])*60 + int(startTime[1])
	#length of each game, in minutes
	gameLength = int(request.data['gameLength'])
	#games to be played by each team per day
	teamGamesPerDay = int(request.data['teamGamesPerDay'])
	
	# TODO:'loactionNum': for case of multiple usable locations
	#	         i.e. 2 or more courts/fields can be used at a time
	#	   'location': string of location name
	#			 i.e. 'Otter Sports Center'

	
	
	teams = list(Team.objects.filter(league=leagueId))
	leagueStart = League.objects.get(id=leagueId).start_date
	if leagueStart.weekday() < gameDay:
		leagueStart += datetime.timedelta(days=gameDay)
	elif leagueStart.weekday() > gameDay:
		leagueStart += 7-leagueStart.weekday() + datetime.timedelta(days=gameDay)

	
	leagueStart = datetime.datetime(leagueStart.year, leagueStart.month, leagueStart.day) + datetime.timedelta(minutes=startTime)
	
	games = generateSchedule(teams, gameNum, leagueStart, gameLength, teamGamesPerDay)
	for game in games:
		# TODO: save games here when everything is finalized
		# game.save()
		print(game)
	
	serializer = GameSerializer(games, context={'request': request}, many=True)
	return Response(serializer.data)


def generateSchedule(teams, gameNum, leagueStart, gameLength, teamGamesPerDay):
	# TODO:
	# case of multiple usable locations
	# how to determine home/away
	# what location will the game be played
	
	if len(teams) % 2 != 0:
		teams.append(None)
	games = []
	
	currDateTime = leagueStart
	currGamesPerDay = 0
	currWeek = 0
	for i in range(gameNum):
		if currGamesPerDay == teamGamesPerDay:
			currGamesPerDay = 0
			currWeek += 1
			currDateTime = leagueStart + datetime.timedelta(weeks=currWeek)
		matrix = [teams[:len(teams)//2], teams[len(teams)//2:][::-1]]
		for j in range(len(matrix[0])):
			if matrix[0][j] != None and matrix[1][j] != None:
				game = Game(league=teams[0].league, 
							start_time=str(currDateTime),
							home_team=matrix[0][j],
							away_team=matrix[1][j])
				games.append(game)
				currDateTime += datetime.timedelta(minutes=gameLength)
		
		currGamesPerDay += 1
		teams = [teams[0]] + [teams[-1]] + teams[1:-1]
	return games

@api_view(['POST'])
def generatePlayoffs(request):
	leagueId = request.data['leagueId']
	startDay = request.data['startDay']
	#int representing day of week, 0 Monday, 6 Sunday
	gameDay = int(request.data['gameDay'])
	#time that games will begin, in minutes
	startTime = request.data['startTime'].split(":")
	startTime = int(startTime[0])*60 + int(startTime[1])
	#length of each game, in minutes
	gameLength = int(request.data['gameLength'])
	#games to be played by each team per day
	teamGamesPerDay = int(request.data['teamGamesPerDay'])
	isBracket = request.data['isBracket']
	teamNum = request.data['teamNum']

	playoffTeams = getPlayoffTeams(leagueId, teamNum)
	
	if not isBracket:
		# round robin style tournament
		# should be able to use the normal game schedule function
		# games = generateSchedule(playoffTeams, len(playoffTeams)-1, startDay, gameLength, teamGamesPerDay)
		pass
	else:
		# bracket tournament
		pass

# def generateBracket():


def getPlayoffTeams(leagueId, numTeams):
	allTeams = Team.objects.filter(league=leagueId)
	ranked = sorted(allTeams)[::-1]
	cutoff = ranked[:numTeams]
	return cutoff


def updateRecords(game):
	if game.home_score == game.away_score:
		game.home_team.ties += 1
		game.away_team.ties += 1
		game.home_team.save()
		game.away_team.save()
		# for player in (list(game.home_team.players.all()) + list(game.away_team.players.all())):
		# 	player.ties += 1
		# 	player.save()
	
	elif game.home_score > game.away_score:
		game.home_team.wins += 1
		game.away_team.losses += 1
		game.home_team.save()
		game.away_team.save()


	else:
		game.home_team.losses += 1
		game.away_team.wins += 1
		game.home_team.save()
		game.away_team.save()

@api_view(['GET'])
def getEventsByUser(request, userId):
	# grab teams based on userId
	team_data = Team.objects.filter(players=userId)
	team_serializer = TeamSerializer(team_data, context={'request': request}, many=True)

	# grab league ids and team ids from the list of teams
	team_ids = []
	league_ids = []
	for i in range(len(team_serializer.data)):
		if team_serializer.data[i]["league"] not in league_ids:
			league_ids.append(team_serializer.data[i]["league"])
		if team_serializer.data[i]["id"] not in team_ids:
			team_ids.append(team_serializer.data[i]["id"])
	
	# grab leagues from list of league ids
	league_data = League.objects.filter(id__in=league_ids)
	league_serializer = LeagueSerializer(league_data, context={'request': request}, many=True)

	# grab sport ids from list of leagues
	sport_ids = []
	for i in range(len(league_serializer.data)):
		if league_serializer.data[i]["sport"] not in sport_ids:
			sport_ids.append(league_serializer.data[i]["sport"])

	# grab sports from list of sport ids
	sport_data = Sport.objects.filter(id__in=sport_ids)
	sport_serializer = SportSerializer(sport_data, context={'request': request}, many=True)

	# grab games from team_ids
	game_data = Game.objects.filter(home_team__in=team_ids) | Game.objects.filter(away_team__in=team_ids)
	game_serializer = GameSerializer(game_data, context={'request': request}, many=True)

	events = []
	# print(game_serializer.data)
	return JsonResponse({'status': 'ok'})

		