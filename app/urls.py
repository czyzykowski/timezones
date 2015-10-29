from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework.authtoken import views
from rest_framework.routers import SimpleRouter

from app.views import UserViewSet, TimezoneViewSet, root


index = TemplateView.as_view(template_name='index.html')

router = SimpleRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'timezones', TimezoneViewSet)


urlpatterns = [
    url(r'^$', index),
    url(r'^api/$', root),
    url(r'^api/', include(router.urls)),
    url(r'^api/api-token-auth/', views.obtain_auth_token),
]
