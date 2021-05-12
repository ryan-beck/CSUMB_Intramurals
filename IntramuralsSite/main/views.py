import json
from datetime import datetime as dt
import datetime
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

	team_join = Team.objects.get(id=team_id)
	serial_team = TeamSerializer(team_join)
	league_id = serial_team.data['league']

	league = League.objects.get(id=league_id)
	league_serializer = LeagueSerializer(league)
	teams_obj = Team.objects.filter(league=league_id)
	serial_teams = TeamSerializer(teams_obj, context={'request': request}, many=True)

	if(len(serial_team.data['players']) == league_serializer.data['player_limit']):
		return JsonResponse({'status': 'FullTeam'})
	for team in serial_teams.data:
		if team['id'] != team_id:
			if user_id in team['players']:
				return JsonResponse({'status': 'PlayerExists'})
	team_join.players.add(user_account)
	team_join.save()
	return JsonResponse({'status': 'ok'})

@api_view(['POST'])
def leave_team(request):
    user_id = request.data['user_id']
    team_id = request.data['team_id']
    user_account = Account.objects.get(id=user_id)
    team = Team.objects.get(id=team_id)
    team.players.remove(user_account)
    team.save()
    return JsonResponse({'status': 'ok'})

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
def getTeamList(request):
    data = Team.objects.all()

    teams = TeamSerializer(data, context={'request': request}, many=True)

    return Response(teams.data)

@api_view(['GET'])
def getPosts(request):
	data = Post.objects.all()

	posts_serializer = PostSerializer(data, context={'request': request}, many=True)
	
	for i in range(len(posts_serializer.data)):
		user = Account.objects.get(id=posts_serializer.data[i]['owner'])
		posts_serializer.data[i]['display_name'] = user.display_name

		date = dt.strptime(posts_serializer.data[i]['posted_date'], '%Y-%m-%dT%H:%M:%SZ')
		posts_serializer.data[i]['posted_date'] = date.strftime("%m-%d-%Y %I:%M %p")
		
	return Response(posts_serializer.data)

@api_view(['GET'])
def getAccountByEmail(request, email):
	if not Account.objects.filter(email=email):
		return JsonResponse({"status":"DoesNotExist"})
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
		game.save()
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

@api_view(['PUT'])
def updateScores(request, leagueId):
	games = request.data
	for game in games:
		game_obj = Game.objects.get(id=game['id'])
		game_obj.home_score = game['home_score']
		game_obj.away_score = game['away_score']
		game_obj.save()
	# serializer = GameSerializer(games, context={'request': request}, many=True)
	# return Response(serializer.data)
	return JsonResponse({'status': 'ok'})

@api_view(['GET'])
def getEventsByLeague(request, leagueId):
	games = Game.objects.filter(league=leagueId)
	game_serializer = GameSerializer(games, context={'request': request}, many=True)
	return Response(game_serializer.data)

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

		gameTime = dt.strptime(game['start_time'], '%Y-%m-%dT%H:%M:%SZ')

		if gameTime > dt.today():

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

	events.sort(key = lambda x: dt.strptime(x['gameTime'], '%m-%d-%Y %I:%M %p'))

	return Response(events)

@api_view(['GET'])
def getTeamsByLeague(request,leagueId):
	team_data = Team.objects.filter(league=leagueId)
	team_data = sorted(team_data)[::-1]
	team_serializer = TeamSerializer(team_data, context={'request': request}, many=True)

	for i in range(len(team_serializer.data)):
		totalGames = team_serializer.data[i]['wins'] + team_serializer.data[i]['losses'] + team_serializer.data[i]['ties']
		wpt = "0.000"
		if totalGames != 0:
			winper = team_serializer.data[i]['wins'] / totalGames
			wpt = "{:.3f}".format(winper)

		team_serializer.data[i]['wpt'] = wpt

	return Response(team_serializer.data)

@api_view(['GET'])
def getAccounts(request):
	account = Account.objects.all()
	account_data = AccountSerializer(account, context={'request': request}, many=True)
	return Response(account_data.data)

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

@api_view(['POST']) 
def createTeam(request):
	serializer = TeamSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['GET'])
def getTeamById(request, teamId):
	team = Team.objects.get(id=teamId)
	team_serializer = TeamSerializer(team, context={'request': request})
	return Response(team_serializer.data)

@api_view(['GET']) 
def getLeagueById(request, leagueId):
	league = League.objects.get(id=leagueId)
	league_serializer = LeagueSerializer(league, context={'request': request})
	return Response(league_serializer.data)

@api_view(['GET']) 
def getSportById(request, sportId):
	sport = Sport.objects.get(id=sportId)
	sport_serializer = SportSerializer(sport, context={'request': request})
	return Response(sport_serializer.data)

@api_view(['GET'])
def getPlayersByTeamId(request, teamId):
	team = Team.objects.get(id=teamId)
	team_serializer = TeamSerializer(team, context={'request': request})

	players = Account.objects.filter(id__in=team_serializer.data['players'])
	player_serializer = AccountSerializer(players, context={'request': request}, many=True)
	return Response(player_serializer.data)

@api_view(['GET']) 
def getGamesByTeam(request, teamId):
	game_data = Game.objects.filter(home_team=teamId) | Game.objects.filter(away_team=teamId)
	game_serializer = GameSerializer(game_data, context={'request': request}, many=True)

	team_data = Team.objects.all()
	team_serializer = TeamSerializer(team_data, context={'request': request}, many=True)

	for i in range(len(team_serializer.data)):
		for j in range(len(game_serializer.data)):
			if team_serializer.data[i]['id'] == game_serializer.data[j]['home_team']:
				game_serializer.data[j]['home_name'] = team_serializer.data[i]['team_name']
			if team_serializer.data[i]['id'] == game_serializer.data[j]['away_team']:
				game_serializer.data[j]['away_name'] = team_serializer.data[i]['team_name']
			gameTime = dt.strptime(game_serializer.data[j]['start_time'], '%Y-%m-%dT%H:%M:%SZ')
			strGameTime = gameTime.strftime("%m-%d-%Y %I:%M %p")

			game_serializer.data[j]['format_start_time'] = strGameTime


	return Response(game_serializer.data)

@api_view(['DELETE'])
def deleteTeam(request, teamId):
	team = Team.objects.get(id=teamId)
	team.delete()
	return HttpResponse('deleted')

@api_view(['PUT'])
def editPlayers(request, teamId):
	team = Team.objects.get(id=teamId)
	serializer = TeamSerializer(team, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return HttpResponse('updated')
