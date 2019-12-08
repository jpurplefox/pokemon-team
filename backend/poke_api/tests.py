from unittest.mock import patch

from django.test import TestCase

from poke_api.services import PokeApi


class PokeApiTest(TestCase):
    @patch('poke_api.services.requests')
    def test_get_all_pokemon_return_pokemon_list(self, requests_mock):
        expected_api_response = {'results': [
            {'name': 'bulbasaur', 'url': 'https://pokeapi.co/api/v2/pokemon/1/'},
            {'name': 'ivysaur', 'url': 'https://pokeapi.co/api/v2/pokemon/2/'},
        ]}
        requests_mock.get.return_value.json.return_value = expected_api_response
        pokemon_list = PokeApi().get_all_pokemon()
        requests_mock.get.assert_called_with('https://pokeapi.co/api/v2/pokemon/', {'limit': 1000})
        self.assertEqual(expected_api_response['results'], pokemon_list)
