from rest_framework.response import Response
from rest_framework.views import APIView

from poke_api.services import PokeApi

class PokemonList(APIView):
    def get(self, request, format=None):
        pokemon_list = PokeApi().get_all_pokemon()
        return Response(pokemon_list)
