from rest_framework.generics import CreateAPIView

from teams import serializers


class ListTeam(CreateAPIView):
    serializer_class = serializers.TeamSerializer
