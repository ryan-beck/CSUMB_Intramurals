import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User

from main.models import Account

def index(request):
    return HttpResponse("Index page for website")

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




