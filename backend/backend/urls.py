"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from teams import views as teams_views
from poke_api import views as pokemon_views

urlpatterns = [
    path('api/teams/', teams_views.TeamList.as_view(), name='team_list'),
    path('api/teams/<int:pk>/', teams_views.TeamDetail.as_view(), name='team_detail'),
    path('api/pokemon/', pokemon_views.PokemonList.as_view(), name='pokemon_list'),
    path('admin/', admin.site.urls),
]
