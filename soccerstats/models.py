from django.db import models

# Create your models here.

class Equipo(models.Model):
	nombre = models.CharField(max_length = 50)
	iniciales = models.CharField(max_length = 5)
	def __unicode__(self):
		return self.iniciales

class Partido(models.Model):
	equipos = models.ManyToManyField(Equipo)
	def __unicode__(self):
		return ' vs '.join([str(a) for a in self.equipos.all()]) 


