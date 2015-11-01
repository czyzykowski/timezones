from django.contrib.auth.models import User

from rest_framework import serializers

from app.models import Timezone


class TimezoneSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Timezone
        fields = ('id', 'owner', 'name', 'city', 'time_difference', 'url')


class UserSerializer(serializers.HyperlinkedModelSerializer):

    def update(self, user, validated_data):
        user.username = validated_data['username']
        user.is_staff = validated_data['is_staff']

        print validated_data
        if 'password' in validated_data:
            user.set_password(validated_data['password'])

        user.save()
        return user

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            is_staff=validated_data['is_staff'],
        )

        if 'password' in validated_data:
            user.set_password(validated_data['password'])

        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff', 'url', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}
