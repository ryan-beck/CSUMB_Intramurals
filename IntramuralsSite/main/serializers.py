from rest_framework import serializers
from .models import League, Sport


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'


class LeaugeSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'