from django.test import TestCase
from django.urls import resolve, reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory

from teams import models, views


class TeamListViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = views.TeamList.as_view()

    def perform_post(self, data):
        request = self.factory.post('/api/teams/', data=data)
        response = self.view(request)
        return response

    def perform_get(self):
        request = self.factory.get('/api/teams/')
        response = self.view(request)
        return response

    def test_url_resolve_to_correct_view(self):
        match = resolve('/api/teams/')

        self.assertEquals(match.func.view_class, views.TeamList)

    def test_create_a_team_return_http_201(self):
        response = self.perform_post({'name': 'My pokemon team'})

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_create_a_team_create_object_in_database(self):
        response = self.perform_post({'name': 'My pokemon team'})

        self.assertEqual(models.Team.objects.count(), 1)
        self.assertEqual(models.Team.objects.first().name, 'My pokemon team')

    def test_create_a_team_return_serialized_object(self):
        response = self.perform_post({'name': 'My pokemon team'})

        self.assertIn('id', response.data)
        self.assertEqual(response.data['id'], models.Team.objects.first().id)
        self.assertIn('name', response.data)
        self.assertEqual(response.data['name'], 'My pokemon team')

    def test_get_teams_return_http_200(self):
        response = self.perform_get()

        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_get_teams_return_all_created_teams(self):
        models.Team.objects.create(name='My pokemon team')
        models.Team.objects.create(name='A second team')

        response = self.perform_get()

        self.assertEqual(len(response.data), 2)
        self.assertIn('My pokemon team', [data['name'] for data in response.data])
        self.assertIn('A second team', [data['name'] for data in response.data])


class TeamDetailViewTest(TestCase):
    def perform_get(self, team_id):
        url = reverse('team_detail', kwargs={'pk': team_id})
        factory = APIRequestFactory()
        request = factory.get(url)
        view, args, kwargs = resolve(url)

        return view(request, *args, **kwargs)

    def test_url_resolve_to_correct_view(self):
        match = resolve('/api/teams/1/')

        self.assertEquals(match.func.view_class, views.TeamDetail)
        self.assertIn('pk', match.kwargs)
        self.assertEquals(match.kwargs['pk'], 1)

    def test_get_non_existent_team_return_http_404(self):
        response = self.perform_get(1)

        self.assertEquals(response.status_code, status.HTTP_404_NOT_FOUND)
