# Timezones

![Screenshot](https://raw.githubusercontent.com/czyzykowski/timezones/master/images/screenshot.png)

## Description

An example project combining [Django][1] as a backend server, [React][2] for
front-end and [Webpack][3] with [hot module replacement][4] as a JavaScript
build tool.

The API is build using [Django Rest Framework][5].

The project itself allows to manage a set of time zones. It always displays
current time in every one of them.

## Instalation

First step is to handle backend part which is handled by Django. First step it
to create a new [virtualenv][6] and then install all required packages.

    $ virtuanenv env
    $ . env/bin/activate
    $ pip install -r requirements.txt

Second step is to install everything required for the front-end. npm will take
care of this.

    $ npm install

Third and last step is to prepare the database for Django app. By default it is
configured to use sqlite3.

    $ python manage.py migrate

At that point (if everything went without any problems) the application is
ready for start.

## Running the application

Start Django server to handle API requests.

    $ python manage.py runserver

Open another console and start webpack dev server, which will server all the
front-end bits. With the help of hot module replacement it will make sure the
latest changes in the front-end code are immediately shipped to the browser.
It's really great dev experience.

    $ grunt webpack-dev-server:start

Last bit is to open the browser and point it at http://localhost:8080/public/#/login

## Running tests

The project contains functional test suite, which exercises the API, without
ever touching internal bits directly. In theory it could be used to smoke test
production deployment.

    $ py.test tests/test_functional.py


[1]: https://www.djangoproject.com/
[2]: https://facebook.github.io/react/
[3]: https://webpack.github.io/
[4]: https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
[5]: http://www.django-rest-framework.org/
[6]: https://virtualenv.readthedocs.org/en/latest/
