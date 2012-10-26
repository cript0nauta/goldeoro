#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'goldeoro.settings'
from soccerstats.models import *

def genera_equipos():
	arc = open('data/equipos.csv','w')
	arc.write('pk,nombre,iniciales\n')
	for equipo in Equipo.objects.all():
		arr = [
			equipo.pk,
			equipo.nombre,
			equipo.iniciales
			]
		arr = ['"'+unicode(a).encode('utf8')+'"' for a in arr]
		arc.write(','.join(arr) + '\n')
	arc.close()

def genera_jugadores():
	arc = open('data/jugadores.csv','w')
	arc.write('pk,equipo,nombre,casaca\n')
	for j in Jugador.objects.all():
		arr = [
			j.pk,
			j.equipo,
			j.nombre,
			j.casaca,
			]
		arr = ['"'+unicode(a).encode('utf8')+'"' for a in arr]
		x =  ','.join(arr) + '\n'
		arc.write(x)
	arc.close()

def main():
	genera_equipos()
	genera_jugadores()

if __name__ == '__main__':
	main()
