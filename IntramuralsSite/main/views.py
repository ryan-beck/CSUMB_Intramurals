from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

def index(request):
    return HttpResponse("Index page for website")


def char_count(request):
    text = request.GET.get("text", "")

    return JsonResponse({"count": len(text)})

def login(request):
	return JsonResponse({"count":10})