from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

from teams import models, serializers


class TeamList(ListCreateAPIView):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()


class TeamDetail(RetrieveAPIView):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()
