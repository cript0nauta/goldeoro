from django.conf.urls import patterns, include, url

urlpatterns = patterns('soccerstats.views',
	url('^$' , 'admin'),
	url('^addmatch/$', 'addmatch'),
	url('^json/players/(?P<equipo>\\d+)/$', 'json_players'),
	url('^finalizado/', 'finalizado'),
	url('^matchlog/(?P<match_id>.+)/$', 'matchlog'),
	url('^partido-admin/(?P<match_id>.+)/$', 'partido_adm'),
)
