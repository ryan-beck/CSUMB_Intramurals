from rest_framework import serializers
from .models import Sport, League

class SportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sport 
        fields = "__all__"

class LeagueSerializer(serializers.ModelSerializer):

    class Meta:
        model = League 
        fields = ('sport', 'league_name', 'start_date', 'end_date', 'reg_start_date', 'reg_end_date')