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

    def test_get_created_teams(self):
        models.Team.objects.create(name='My pokemon team')
        models.Team.objects.create(name='A second team')

        request = self.factory.get('/api/teams/')
        response = views.ListTeam.as_view()(request)

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertIn('My pokemon team', [data['name'] for data in response.data])
        self.assertIn('A second team', [data['name'] for data in response.data])
