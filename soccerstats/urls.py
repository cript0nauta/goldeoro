from django.conf.urls import patterns, include, url

urlpatterns = patterns('soccerstats.views',
	url('^adminmatch/$' , 'admin'),
	url('^partido-admin/(?P<match_id>.+)/$', 'partido_adm'),
)
