import json
from datetime import datetime
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
def create_post(request):
	serializer = PostSerializer(data=request.data)
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
def getPosts(request):
	data = Post.objects.all()

	posts_serializer = PostSerializer(data, context={'request': request}, many=True)
	
	for i in range(len(posts_serializer.data)):
		user = Account.objects.get(id=posts_serializer.data[i]['owner'])
		posts_serializer.data[i]['display_name'] = user.display_name

		date = datetime.strptime(posts_serializer.data[i]['posted_date'], '%Y-%m-%dT%H:%M:%SZ')
		posts_serializer.data[i]['posted_date'] = date.strftime("%m-%d-%Y %I:%M %p")
		
	return Response(posts_serializer.data)

@api_view(['GET'])
def getAccountByEmail(request, email):
	account = Account.objects.get(email=email)
	serializer = AccountSerializer(instance=account)
	return Response(serializer.data)

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

	#put together events to be able to return one list
	events = []
	for game in game_serializer.data:
		leagueTitle = ''
		sportId = 0
		sportTitle = ''
		teamName = ''
		home = False

		gameTime = datetime.strptime(game['start_time'], '%Y-%m-%dT%H:%M:%SZ')

		if gameTime > datetime.today():

			for i in range(len(team_serializer.data)):
				if team_serializer.data[i]['id'] == game['home_team']:
					home = True
					teamName = team_serializer.data[i]['team_name']
					break
				elif team_serializer.data[i]['id'] == game['away_team']:
					home = False
					teamName = team_serializer.data[i]['team_name']
					break

			for i in range(len(league_serializer.data)):
				if league_serializer.data[i]['id'] == game['league']:
					sportId = league_serializer.data[i]['sport']
					leagueTitle = league_serializer.data[i]['league_name']
					break

			for i in range(len(sport_serializer.data)):
				if sport_serializer.data[i]['id'] == sportId:
					sportTitle = sport_serializer.data[i]['sport_name']
					break

			event = sportTitle + ': ' + leagueTitle + ' - ' + teamName
			strGameTime = gameTime.strftime("%m-%d-%Y %I:%M %p")
			pair = {'gameTime': strGameTime, 'gameTitle':event, 'homeTeam': home}
			events.append(pair)

	events.sort(key = lambda x: datetime.strptime(x['gameTime'], '%m-%d-%Y %I:%M %p'))

	return Response(events)

@api_view(['DELETE'])
def deletePost(request, postId):
	post = Post.objects.get(id=postId)
	post.delete()
	return HttpResponse('deleted')

@api_view(['PUT'])
def editPost(request, postId):
	post = Post.objects.get(id=postId)
	serializer = PostSerializer(post, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return HttpResponse('updated')
