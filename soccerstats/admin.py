from soccerstats.models import *
from django.contrib import admin

admin.site.register(Partido)

class PlayerInline(admin.TabularInline):
	model = Jugador
	extra = 11
class EquipoAdmin(admin.ModelAdmin):
	inlines = [PlayerInline]
admin.site.register(Equipo, EquipoAdmin)

admin.site.register(Jugador)
admin.site.register(Jugada)
