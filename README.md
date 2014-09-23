#Installation
```bash
$ bower install ng-foobar --save
```

#Usage
1. Include both **ng-foobar.js** and **ng-foobar.css** in your website.

```html
<script src="bower_components/ng-foobar/ng-foobar.js"></script>
<link rel="stylesheet" href="bower_components/ng-foobar/ng-foobar.css">
```

2. Set **ngFoobar** as a dependency in your module

```javascript
var app = angular.module('myApp', ['ngFoobar']);
```

3. Inject **ngFoobar** provider in controller

```javascript
var MyCtrl = function($scope, $timeout, ngFoobar) {}
```

Use with the API down below.

#API
* **show(context, message)** - Display message in the screen
 * **context** - `"success"'`, `"error"`, `"warning"` or `"info"`
 * **message** - the message to be displayed 

```javascript
ngFoobar.show(context, message);
```
