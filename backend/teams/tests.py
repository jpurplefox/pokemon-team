from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from teams import models, views


class TeamsTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_create_a_team_successfully(self):
        request = self.factory.post('/api/teams/', data={ 'name': 'My pokemon team' })
        response = views.ListTeam.as_view()(request)

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Team.objects.count(), 1)
        self.assertEqual(models.Team.objects.first().name, 'My pokemon team')
