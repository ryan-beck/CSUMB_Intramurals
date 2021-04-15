from django.shortcuts import render
from django.http import HttpResponse

from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Sport

from .serializers import *

def index(request):
    return HttpResponse("Index page for website")


def char_count(request):
    text = request.GET.get("text", "")

    return JsonResponse({"count": len(text)})

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