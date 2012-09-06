from django.http import HttpResponse, HttpResponseRedirect
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

def addmatch(request):
	if not request.POST:
		return render_to_response('soccerstats/addmatch.html',
		{
			'equipos' : Equipo.objects.all(),
		}, RequestContext(request))
	else:
		local = request.POST.get('local','')
		local = Equipo.objects.get(pk=local)
		
		visitante = request.POST.get('visitante','')
		visitante = Equipo.objects.get(pk=visitante)
		
		jugadores_ = request.POST.get('jugadores', '')
		jugadores = []
		for jugador in jugadores_.split(';'):
			jugadores.append(Jugador.objects.get(pk=jugador))

		partido = Partido.objects.create()
		partido.equipos = [local, visitante]
		partido.jugadores = jugadores
		partido.save()
		return HttpResponseRedirect('/adminmatch/')

def json_players(request, equipo):
	jugadores = Jugador.objects.filter(equipo__pk=equipo)
	jugadores = [{'pk':jugador.pk, 'nombre':jugador.nombre} for jugador in jugadores]
	return HttpResponse(simplejson.dumps({'jugadores':jugadores}))

def partido_adm(request, match_id):
	equipo = Partido.objects.get(pk=match_id)
	return render_to_response('soccerstats/partido-admin.html',
			{
				'partido' : equipo,
				'jugadores': [equipo.jugadores.all()[:12], equipo.jugadores.all()[11:]],
			}, RequestContext(request))
