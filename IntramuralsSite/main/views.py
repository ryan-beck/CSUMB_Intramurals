import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User

from main.models import Account

def index(request):
    return HttpResponse("Index page for website")


def char_count(request):
    text = request.GET.get("text", "")

    return JsonResponse({"count": len(text)})

def login(request):
	body = json.loads(request.body.decode('utf-8'))
	if request.method == 'POST':
		email = body["email"]
		if not Account.objects.filter(email=email).exists():
			name = body["name"]
			imageUrl = body["imageUrl"]

			try:
				user = User.objects.create_user(email, None, "")
				user.save()
				account = Account(
					email=email, 
					display_name=name, 
					photo_url=imageUrl,
					is_admin=False)
				account.save()
			except Exception as e:
				return HttpResponse(e)
		#add account authentication/ login stuff here
		return redirect('/api/testLogin/')

def testLogin(request):
	#add check for is request.user.is_authenticated here for testing
	return HttpResponse("please")


