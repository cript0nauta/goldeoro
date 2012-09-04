from django.db import models

# Create your models here.

class Equipo(models.Model):
	nombre = models.CharField(max_length = 50)
	iniciales = models.CharField(max_length = 5)
	def __unicode__(self):
		return self.iniciales


class Jugador(models.Model):
	nombre = models.CharField(max_length = 60)
	casaca = models.IntegerField()
	equipo = models.ForeignKey(Equipo)
	activo = models.BooleanField(default = True)
	def __unicode__(self):
		return self.nombre

class Partido(models.Model):
	equipos = models.ManyToManyField(Equipo)
	def __unicode__(self):
		return ' vs '.join([str(a) for a in self.equipos.all()]) 

class Jugada(models.Model):
	partido = models.ForeignKey(Partido)
	jugadores = models.ManyToManyField(Jugador)
	tiempo = models.IntegerField()
	contexto = models.CharField(max_length = 1, choices = (
		('T', 'Tiro Libre'),
		('L', 'Lateral'),
		('C', 'Corner'),
		('A', 'Saque de arco'),
		('P', 'Pique'),
		('M', 'Saque del medio'),
		('P', 'Penal'),
	), blank = True)
