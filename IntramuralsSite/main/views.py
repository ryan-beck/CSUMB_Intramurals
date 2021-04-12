from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Account, Team

def index(request):
    return HttpResponse("Index page for website")


def char_count(request):
    text = request.GET.get("text", "")

    return JsonResponse({"count": len(text)})

@api_view(['POST'])
def join_team(request):
    user_id = request.data['user_id']
    team_id = request.data['team_id']
    user_account = Account.objects.get(id=user_id)
    team = Team.objects.get(id=team_id)
    team.players.add(user_account)
    team.save()
    return HttpResponse('Successfully joined team')

    # print("here 1")
    # if request.method == "POST":
    #     print("here 2")
    #     user_id = request.POST.get("user_id")
    #     team_id = request.POST.get("team_id")
    #     user_account = Account.objects.get(id=user_id)
    #     team = Team.objects.get(id=team_id)
    #     team.players.add(user_account)
    #     team.save()
    #     return HttpResponse('Successfully joined team')
    # return HttpResponse('Failed')
