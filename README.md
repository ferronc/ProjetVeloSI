# LOUTRE Organize Ur Travel Receiving Entries

Dans le cadre du projet JXS, nous réalisons une interface web qui va récupérer les informations de notre application mobile (trajets assistés pour vélo électrique).
L'interface a pour but d'informer l'utilisateur sur son utilisation du vélo et d'avoir un accès direct sur ces informations par le web.

Nous distinguons deux parties distinctes dans ce projet :
- La partie client : qui récupèrent les données de la base de données et les affiche afin d'informer l'utilisateur sur ses performances et son utilisation du vélo électrique
- La partie générateur d'événements : qui va remplacer l'application mobile et va générer des données sur le vélo électrique dans la base de données

## 1. Database

1. Move to database folder
- cd `test` then `creationBDD` OR cd `test\creationBDD`
2. You can find the script to create the database : loutreBDD.sql

## 2. Client

### 2.1 Dependencies

- [AngularJS] (https://angulars.org/)
- [bower](http://bower.io/)
- [grunt-cli](https://www.npmjs.com/package/grunt-cli)
- [SB Admin] (http://startbootstrap.com/template-overviews/sb-admin/)

#### 2.1.1 SB Admin v2.0 rewritten in AngularJS

[![Join the chat at https://gitter.im/start-angular/sb-admin-angular](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/start-angular/sb-admin-angular?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This project is a port of the famous Free Admin Bootstrap Theme [SB Admin v2.0](http://startbootstrap.com/template-overviews/sb-admin-2/) to Angular Theme.

Find out more [Free Angular Themes at StartAngular.com](http://www.startangular.com/).

##### 2.1.1.1 Installation
1. Clone this project or Download that ZIP file
2. Make sure you have angularjs [bower](http://bower.io/), [grunt-cli](https://www.npmjs.com/package/grunt-cli) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `npm install` - bower install is ran from the postinstall
- `npm start` - a shortcut for `grunt serve`
- `npm run dist` - a shortcut for `grunt serve:dist` to minify the files for deployment

##### 2.1.1.2 Roadmap

- Add sample AJAX calls and make the directives more modular

##### 2.1.1.3 Automation tools

- [Grunt](http://gruntjs.com/)

### 2.2 Run client

- `npm start`

## 3. Events generator

### 3.1 Dependencies

- NodeJS (https://nodejs.org/)
- npm (https://www.npmjs.org/)
- socket.io (http://socket.io/)
- mysql (https://www.npmjs.com/package/mysql)

### 3.2 Installation

1. Move to generator folder (test/generator)
- cd `test` then `generator` OR cd `test\generator`
2. Install dependencies of generator
- `npm install socket.io` - socket.io install
- `npm install mysql` - mysql install
- OR `npm install` - Use directly the package.json which describe dependencies (with socket.io and mysql)

### 3.3 Run generator

- `node app.js` - Run the events generator from localhost