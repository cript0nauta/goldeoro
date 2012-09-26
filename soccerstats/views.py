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
	partido = get_object_or_404(Partido, pk = match_id)
	return render_to_response('soccerstats/partido-admin.html',
			{
				'partido' : partido,
				'jugadores': [partido.jugadores.all()[:11], partido.jugadores.all()[11:]],
			}, RequestContext(request))

def finalizado(request):
	if(request.method != 'POST'):
		return HttpResponse('La request debe ser en formato POST')
	
	partido_id = request.POST.get('partido','')
	json = request.POST.get('json','')
	if not(partido_id and json):
		return HttpResponse('Los campos no estan correctamente completados')
	
	partido = get_object_or_404(Partido, pk=partido_id)
	partido.json = json
	partido.save()
	return HttpResponseRedirect('/adminmatch/')

def matchlog(request, match_id):
	partido = get_object_or_404(Partido, pk = match_id)
	return render_to_response('soccerstats/matchlog.html',
			{
				'partido' : partido,
				'jugadores' : [partido.jugadores.all()[:11], partido.jugadores.all()[11:]],
			}, RequestContext(request))
