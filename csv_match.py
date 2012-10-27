#!/usr/bin/env python
# -*- coding: utf-8 -*-

""" Genera ficheros CSV dado el ID de un partido jugado """

import os, sys
os.environ['DJANGO_SETTINGS_MODULE'] = 'goldeoro.settings'
from soccerstats.models import *
from django.core.serializers.json import simplejson

def genera_datos(partido):
	arc = open('data/data_' + str(partido.pk) + '.csv', 'w')
	arc.write('\n'.join([str(p.pk) for p in partido.equipos.all()]))
	arc.close()

def genera_jugadores(partido):
	arc = open('data/players_' + str(partido.pk) + '.csv', 'w')
	arc.write('\n'.join([str(j.pk) for j in partido.jugadores.all()]))
	arc.close()

def genera_jugadas(partido):
	arc = open('data/jugadas_' + str(partido.pk) + '.csv', 'w')
	json = simplejson.loads(partido.json)
	for j in json:
		x = [
			str(j[0]),
			'1' if j[1] else '0',
			str(j[2]) if j[2] else '0', 
			str(j[3]) if j[3] else '9',
			j[4] if j[4] else '',
			'1' if j[5] else '0']
		arc.write(','.join(['"'+e+'"' for e in x]) + '\n')
	arc.close()

def genera_pases(partido):
	arc = open('data/pases_' + str(partido.pk) + '.csv', 'w')

	json = simplejson.loads(partido.json)
	pases, malas = {}, {}
	for jugador in Jugador.objects.filter(equipo__in = partido.equipos.all()):
		pases[jugador.pk] = 0
		malas[jugador.pk] = 0
	for jugada in json:
		""" Calcula pases y jugadas malas por jugador """
		timestamp, periodo, de, a, contexto, saque = jugada
		if de and a:
			de = Jugador.objects.get(pk=de)
			a  = Jugador.objects.get(pk=a )
			if de.equipo == a.equipo:
				""" Pase bueno """
				pases[de.pk] += 1
			else:
				""" Pelota perdida """
				malas[de.pk] += 1

	for pk in pases:
		jugador = Jugador.objects.get(pk=pk)
		arc.write(','.join([
			str(pk),
			str(pases[pk]),
			str(malas[pk]),
			])+'\n')

	arc.close()

def main():
	if len(sys.argv) != 2:
		print 'Uso: ./csv_match.py <match_id>'
		exit()
	partido = Partido.objects.get(pk=sys.argv[1])
	genera_datos(partido)
	genera_jugadores(partido)
	genera_jugadas(partido)
	genera_pases(partido)

if __name__ == '__main__':
	main()
