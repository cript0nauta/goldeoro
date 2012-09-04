from django.conf.urls import patterns, include, url

urlpatterns = patterns('soccerstats.views',
	url('^$' , 'main'),
	url('^partido/(?P<match_id>.+)/$', 'partido'),
)
