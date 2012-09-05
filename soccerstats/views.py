from django.http import HttpResponse
from soccerstats.models import *
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

# Create your views here.

from django.http import HttpResponse
from soccerstats.models import *
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.core.serializers.json import simplejson

# Create your views here.

def admin(request):
	return render_to_response('soccerstats/adminmatch.html',
		{'partidos' : Partido.objects.all()},
		RequestContext(request))

def partido_adm(request, match_id):
	return HttpResponse('En construccion')

def addmatch(request):
	return render_to_response('soccerstats/addmatch.html',
	{
		'equipos' : Equipo.objects.all(),
	}, RequestContext(request))

def json_players(request, equipo):
	jugadores = Jugador.objects.filter(equipo__pk=equipo)
	jugadores = [jugador.nombre for jugador in jugadores]
	return HttpResponse(simplejson.dumps({'jugadores':jugadores}))
