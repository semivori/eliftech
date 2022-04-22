DEMO: http://eliftech.semivori.ml/

### REST API

      GET      /banks         list all banks page by page;
      POST     /banks         create a new bank;
      GET      /banks/123     return the details of the bank 123;
      PATCH    /banks/123     and PUT /banks/123: update the bank 123;
      DELETE   /banks/123     delete the bank 123;
      HEAD     /banks         show the overview information of bank listing;
      HEAD     /banks/123     show the overview information of bank 123;
      OPTIONS  /banks         show the supported verbs regarding endpoint /banks;
      OPTIONS  /banks/123     show the supported verbs regarding endpoint /banks/123.

REQUIREMENTS
------------

- PHP 7.2
- MySQL > 8.0
- Node.js > 14
- NPM > 7.5

CONFIGURATION
-------------

### Database

Edit the file `config/db.php` with real data, for example:

```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=yii2basic',
    'username' => 'root',
    'password' => '1234',
    'charset' => 'utf8',
];
```

INSTALLATION
------------

~~~
composer install
~~~

~~~
php yii migrate
~~~

~~~
cd vue && npm install && npm run build
~~~

Front end
------------

- Vue.js 2
- Vuex
- VueRouter
- VeeValidate
- Bootstrap 4

Back end
------------

- PHP
- Yii2
- MySQL
