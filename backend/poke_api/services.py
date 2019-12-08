import requests


class PokeApi:
    def get_all_pokemon(self):
        response = requests.get('https://pokeapi.co/api/v2/pokemon/', {'limit': 1000})
        return response.json()['results']
