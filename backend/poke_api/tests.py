from unittest.mock import patch

from django.core.cache import cache
from django.test import TestCase
from django.urls import resolve
from rest_framework import status
from rest_framework.test import APIRequestFactory

from poke_api.services import PokeApi
from poke_api import views


class PokeApiTest(TestCase):
    @patch('poke_api.services.requests')
    def test_get_all_pokemon_return_pokemon_list(self, requests_mock):
        cache.clear()
        expected_api_response = {'results': [
            {'name': 'bulbasaur', 'url': 'https://pokeapi.co/api/v2/pokemon/1/'},
            {'name': 'ivysaur', 'url': 'https://pokeapi.co/api/v2/pokemon/2/'},
        ]}
        requests_mock.get.return_value.json.return_value = expected_api_response

        pokemon_list = PokeApi().get_all_pokemon()

        requests_mock.get.assert_called_with('https://pokeapi.co/api/v2/pokemon/', {'limit': 1000})
        self.assertEqual(expected_api_response['results'], pokemon_list)
        cache.clear()

    @patch('poke_api.services.requests')
    def test_many_calls_to_get_all_pokemom_call_poke_api_once(self, requests_mock):
        cache.clear()
        expected_api_response = {'results': [
            {'name': 'bulbasaur', 'url': 'https://pokeapi.co/api/v2/pokemon/1/'},
            {'name': 'ivysaur', 'url': 'https://pokeapi.co/api/v2/pokemon/2/'},
        ]}
        requests_mock.get.return_value.json.return_value = expected_api_response

        pokemon_list = PokeApi().get_all_pokemon()
        pokemon_list = PokeApi().get_all_pokemon()

        requests_mock.get.assert_called_once()
        cache.clear()


class PokemonListViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = views.PokemonList.as_view()

    def perform_get(self):
        request = self.factory.get('/api/pokemon/')
        response = self.view(request)
        return response

    def test_url_resolve_to_correct_view(self):
        match = resolve('/api/pokemon/')

        self.assertEquals(match.func.view_class, views.PokemonList)

    @patch('poke_api.views.PokeApi')
    def test_get_pokemon_list_return_http_200(self, poke_api_mock):
        response = self.perform_get()

        self.assertEquals(response.status_code, status.HTTP_200_OK)

    @patch('poke_api.views.PokeApi')
    def test_get_pokemon_list_return_the_list(self, poke_api_mock):
        pokemon_list = [
            {'name': 'bulbasaur', 'url': 'https://pokeapi.co/api/v2/pokemon/1/'},
            {'name': 'ivysaur', 'url': 'https://pokeapi.co/api/v2/pokemon/2/'},
        ]

        poke_api_mock.return_value.get_all_pokemon.return_value = pokemon_list
        response = self.perform_get()

        poke_api_mock.return_value.get_all_pokemon.assert_called_once()
        self.assertEqual(response.data, pokemon_list)
