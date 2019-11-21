from rest_framework.generics import ListCreateAPIView

from teams import models, serializers


class TeamList(ListCreateAPIView):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()
