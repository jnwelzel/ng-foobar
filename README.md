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
 * **context** - `[string]` `"success"'`, `"error"`, `"warning"` or `"info"`
 * **message** - `[string]` The message to be displayed 
```javascript
ngFoobar.show("success", "Hi, I'm a successful notification message");
```

* **setAutoClose(autoClose, displayTime)** - Enable/disable notification auto close
 * **autoClose** - `[boolean]` Whether to auto close the notifications or not (default value is `false`)
 * **displayTime** - `[number]` The display duration in milliseconds (default value is `3000`)
```javascript
ngFoobar.setAutoClose(true, 5);
```

* **setColors(context, colors)** - Change the colors of a specific context
 * **context** - `[string]` `"success"'`, `"error"`, `"warning"` or `"info"`
 * **colors** - `[object] ` `color`, `background` and `border` - new color values
```javascript
ngFoobar.setColors("success", {color: "#3C763D", background: "#DFF0D8", border: "#D6E9C6"});
```

* **resetColors()** - Resets all colors for all contexts to their default values
```javascript
ngFoobar.resetColors();
```

* **setOpacity(opacity)** - change the opacity to the specified value
 * **opacity** - `[number]` The desired opacity value for the notification bar (default is `0.9`)
```javascript
ngFoobar.setOpacity(0.8);
```

#Demo
A working demo can be found at [http://ng-foobar.herokuapp.com/](http://ng-foobar.herokuapp.com/)

#License
MIT
