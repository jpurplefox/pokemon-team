from rest_framework.exceptions import NotFound
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from teams import models, serializers


class TeamList(ListCreateAPIView):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()


class TeamDetail(APIView):
    def get(self, request, pk, format=None):
        try:
            models.Team.objects.get(pk=pk)
        except models.Team.DoesNotExist:
            raise NotFound()
        return Response()
