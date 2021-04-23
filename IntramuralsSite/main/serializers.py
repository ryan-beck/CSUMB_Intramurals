from rest_framework import serializers
from .models import *


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'