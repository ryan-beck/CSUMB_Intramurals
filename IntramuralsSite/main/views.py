import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Account, Team, League
from .serializers import LeaugeSerializer, SportSerializer

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
	serializer = LeaugeSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

def createAccount(request):
	body = json.loads(request.body.decode('utf-8'))
	if request.method == 'POST':
		email = body["email"]
		if not Account.objects.filter(email=email).exists():
			name = body["name"]
			imageUrl = body["imageUrl"]
			try:
				account = Account(
					email=email, 
					display_name=name, 
					photo_url=imageUrl,
					is_admin=False)
				account.save()
			except Exception as e:
				return HttpResponse(e)
		return JsonResponse({'status': 'ok'})




