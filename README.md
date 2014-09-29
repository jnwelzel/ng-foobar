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
ngFoobar.show("success", "Hi, I'm a successful notification message)";
```

* **setAutoClose(autoClose, displayTime)** - Enable/disable notification auto close
 * **autoClose** - `[boolean]` Whether to auto close the notifications or not (default value is `false`)
 * **displayTime** - `[number]` The display duration in seconds (default value is `3`)
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
The MIT License (MIT)

Copyright (c) 2014 Jonathan Welzel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

