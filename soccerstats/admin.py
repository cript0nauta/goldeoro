from soccerstats.models import *
from django.contrib import admin

admin.site.register(Partido)

class PlayerInline(admin.TabularInline):
	model = Jugador
	extra = 11
	exclude = ['activo']
class EquipoAdmin(admin.ModelAdmin):
	inlines = [PlayerInline]
admin.site.register(Equipo, EquipoAdmin)

class PlayerAdmin(admin.ModelAdmin):
	list_display = ['nombre','equipo']
	search_fields = ['nombre', 'equipo__iniciales', 'equipo__nombre']
admin.site.register(Jugador, PlayerAdmin)

admin.site.register(Jugada)
