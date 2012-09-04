from django.http import HttpResponse
from soccerstats.models import *
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

# Create your views here.
def main(request):
	return render_to_response('soccerstats/main.html',
		{'partidos' : Partido.objects.all()},
		RequestContext(request))

def partido(request, match_id):
	return HttpResponse('En construccion')
