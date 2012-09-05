from django.conf.urls import patterns, include, url

urlpatterns = patterns('soccerstats.views',
	url('^adminmatch/$' , 'admin'),
	url('^partido-admin/(?P<match_id>.+)/$', 'partido_adm'),
	url('^addmatch/$', 'addmatch'),
	url('^json/players/(?P<equipo>\\d+)/$', 'json_players'),
)
