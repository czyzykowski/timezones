import pytest
import requests


class Client(object):
    def __init__(self, username, password):
        self.username = username

        token = self.auth_token(username, password)

        self.authorization = {'Authorization': 'Token {}'.format(token)}

    def api(self, endpoint):
        if 'http' in endpoint:
            return endpoint
        return 'http://127.0.0.1:8000/api/{}'.format(endpoint)

    def auth_token(self, username, password):
        credentials = {'username': username, 'password': password}
        response = requests.post(self.api('api-token-auth/'), credentials)
        return response.json()['token']

    def get(self, endpoint):
        return requests.get(
            self.api(endpoint),
            headers=self.authorization
        )

    def post(self, endpoint, data):
        return requests.post(
            self.api(endpoint),
            data=data,
            headers=self.authorization
        )

    def patch(self, endpoint, data):
        return requests.put(
            self.api(endpoint),
            data=data,
            headers=self.authorization
        )

    def delete(self, endpoint):
        return requests.delete(
            self.api(endpoint),
            headers=self.authorization
        )


@pytest.fixture(scope='module')
def admin():
    return Client('admin', 'admin')


@pytest.fixture(scope='module')
def client():
    return Client('user', 'password')


def setup_module(module):
    admin = Client('admin', 'admin')

    for user in admin.get('users').json():
        if user['username'] == admin.username:
            continue
        response = admin.delete(user['url'])
        assert response.status_code == 204

    for timezone in admin.get('timezones').json():
        response = admin.delete(timezone['url'])
        assert response.status_code == 204

    admin.post('users', {
        'username': 'user',
        'password': 'password',
        'is_staff': False,
    })


def test_as_admin_create_user(admin):
    response = admin.post('users', {
        'username': 'newuser',
        'password': 'userpassword',
        'is_staff': False,
    })

    assert response.status_code == 201

    response = admin.get('users')
    usernames = [user['username'] for user in response.json()]
    assert 'newuser' in usernames


def test_as_admin_update_user(admin):
    response = admin.post('users', {
        'username': 'toupdate',
        'password': 'password',
        'is_staff': False,
    })
    user_url = response.headers['Location']

    response = admin.patch(user_url, {
        'username': 'newusername',
        'is_staff': True,
    })

    assert response.status_code == 200

    user_data = admin.get(user_url).json()

    assert user_data['username'] == 'newusername'
    assert user_data['is_staff'] is True


def test_as_admin_delete_user(admin):
    response = admin.post('users', {
        'username': 'todelete',
        'is_staff': False,
    })
    user_url = response.headers['Location']

    response = admin.delete(user_url)
    assert response.status_code == 204

    users = admin.get('users').json()
    assert 'todelete' not in [user['username'] for user in users]


def test_as_user_do_not_have_access_to_users(client):
    response = client.get('users')

    assert response.status_code == 403


def test_as_user_create_timezone(client):
    response = client.post('timezones', {
        'name': 'Dominican Republic',
        'city': 'Santo Domingo',
        'time_difference': -4
    })
    assert response.status_code == 201

    timezones = client.get('timezones').json()

    assert 'Dominican Republic' in [timezone['name'] for timezone in timezones]


def test_as_user_update_timezone(client):
    response = client.post('timezones', {
        'name': 'Spain',
        'city': 'Madrid',
        'time_difference': 2
    })
    timezone_url = response.headers['Location']

    response = client.patch(timezone_url, {
        'city': 'Barcelona',
        'name': 'Spain',
        'time_difference': 2
    })
    assert response.status_code == 200

    timezone_data = client.get(timezone_url).json()
    assert timezone_data['name'] == 'Spain'
    assert timezone_data['city'] == 'Barcelona'


def test_as_user_delete_timezone(client):
    response = client.post('timezones', {
        'name': 'Spain',
        'city': 'Madrid',
        'time_difference': 2
    })
    timezone_url = response.headers['Location']

    response = client.delete(timezone_url)
    assert response.status_code == 204

    response = client.get(timezone_url)
    assert response.status_code == 404


def test_as_user_filter_timezones_by_name(client):
    for data in client.get('timezones').json():
        client.delete(data['url'])

    for name in ['Spain', 'Poland', 'USA']:
        response = client.post('timezones', {
            'name': name,
            'city': 'City of {}'.format(name),
            'time_difference': 1
        })
        assert response.status_code == 201

    assert len(client.get('timezones?q=Pol').json()) == 1
    assert len(client.get('timezones?q=p').json()) == 2

    usa = client.get('timezones?q=usa').json()[0]
    assert usa['name'] == 'USA'
    assert usa['city'] == 'City of USA'
