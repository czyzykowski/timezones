from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet

from app.serializers import UserSerializer, TimezoneSerializer
from app.models import Timezone


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class TimezoneViewSet(ModelViewSet):
    queryset = Timezone.objects.all()
    serializer_class = TimezoneSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def filter_queryset(self, queryset):
        if not self.request.user.is_staff:
            queryset = queryset.filter(owner=self.request.user)

        q = self.request.GET.get('q')
        if q:
            queryset = queryset.filter(name__icontains=q)

        return queryset


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def root(request):
    is_admin = request.user.is_staff
    data = {
        'role': 'admin' if is_admin else 'user',
        'timezones': {
            'href': reverse('timezone-list', request=request)
        }
    }
    if is_admin:
        data['users'] = {
            'href': reverse('user-list', request=request)
        }
    return Response(data=data)
