from django.http import HttpResponse
from soccerstats.models import *
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def admin(request):
	return render_to_response('soccerstats/main.html',
		{'partidos' : Partido.objects.all()},
		RequestContext(request))

@login_required
def partido_adm(request, match_id):
	return HttpResponse('En construccion')
