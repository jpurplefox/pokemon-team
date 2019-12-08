import requests

from django.core.cache import cache


class PokeApi:
    def get_all_pokemon(self):
        results = cache.get('pokemon_list')
        if not results:
            response = requests.get('https://pokeapi.co/api/v2/pokemon/', {'limit': 1000})
            results = response.json()['results']
            cache.set('pokemon_list', results)
        return results
