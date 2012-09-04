from django.db import models

# Create your models here.

class Partido(models.Model):
	local = models.CharField(max_length = 50)
	visitante = models.CharField(max_length = 50)
	def __unicode__(self):
		return self.local + ' vs ' + self.visitante

