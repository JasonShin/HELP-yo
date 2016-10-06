# Installation

``` sh
$npm install
```


### Run


```sh
$ npm run dev
$ webpack --watch
```


Make sure you are in HELP project folder



## Dependent config files
There are few dependent config files requires in order to run the system.


```javascript
//config/config.js   => Required for HELP API and Firebase API

module.exports = {
	baseURL: %API_URL%,
	appKey: %APP_KEY%,
	firebaseURL: %FIREBASE_URL%,
	titleEnding: ' - UTS HELPS',
	webpackEnv: %CURRENT_DEV_ENVIRONEMENT (development || production)%
};

```


```javascript

//config/firebase.config.js   => required for firebase authentication
module.exports = {
    apiKey: %API_KEY%,
    authDomain: %AUTH_DOMAIN%,
    databaseURL: %DATEBASE_URL%,
    storageBucket: %STORAGE_BUCKET%,
};

```


```javascript
//.firebaserc    =>  firebase hosting config

{
  "projects": {
    "default": %PROJECT_NAME_FIREBASE_CONSOLE%
  }
}
```


### Tech

Help current uses several technologies

* [ReactJS] - Reconciliate your app to make it blazing fast at rendering
* [MobX] - Mob X helps you to build React App much more efficiently and easily
* [SCSS] - SCSS enables you to build CSS in structural way by eliminating repeated styling code
* [ITCSS] - CSS design pattern to enable you to componentize your CSS development
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Webpack] - the streaming build system
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

**Free Software, Hell Yeah! http://dillinger.io/**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
