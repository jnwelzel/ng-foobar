/* ngFoobar, (c) 2014 Jonathan Welzel - http://jonwelzel.com/ng-foobar
 * @license MIT */

'use strict';
angular.module('ngFoobar.provider', ['ngFoobar.directive'])
  .provider('ngFoobar', function () {

  });

angular.module('ngFoobar.directive', [])
  .directive('ngFoobar', ['$window', function ($window) {
    var ngFoobar = {};

    ngFoobar.version = '0.0.1';

    ngFoobar.success = {
      color: '#3C763D',
      backgroud: '#DFF0D8',
      border: '#D6E9C6'
    };

    ngFoobar.warning = {
      color: '#C09853',
      backgroud: '#FCF8E3',
      border: '#FBEED5'
    };

    ngFoobar.info = {
      color: '#1E90FF',
      backgroud: '#FFF',
      border: '#EBEBEB'
    };

    ngFoobar.error = {
      color: '#B94A48',
      backgroud: '#F2DEDE',
      border: '#EED3D7'
    };

    ngFoobar.colors = [];
    ngFoobar.colors['success'] = ngFoobar.success;
    ngFoobar.colors['warning'] = ngFoobar.warning;
    ngFoobar.colors['info'] = ngFoobar.info;
    ngFoobar.colors['error'] = ngFoobar.error;

    var Colors = ngFoobar.colors;

    var Settings = ngFoobar.settings = {
      autoClose: true,
      displayTime: 3,
      barSelector: '[role="bar"]',
      template: '<div class="bar" role="bar"><div class="message">%message%</div></div>'
    };

    /**
     * Updates configuration.
     *
     *     ngFoobar.configure({
     *       minimum: 0.1
     *     });
     */
    ngFoobar.configure = function(options) {
      var key, value;
      for (key in options) {
        value = options[key];
        if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
      }

      return this;
    };

    /**
     * (Internal) renders the message bar markup based on the `template`
     * setting.
     */

    ngFoobar.showMessage = function(context, message) {
      if (ngFoobar.isRendered()) {
        removeElement(document.getElementById('ng-foobar'));
      }
      var foobarDiv = document.createElement('div');
      foobarDiv.id = 'ng-foobar';
      foobarDiv.addEventListener('click', ngFoobar.hideMessage);
      foobarDiv.addEventListener('transitionend', afterTransition);

      foobarDiv.innerHTML = Settings.template.replace('%message%', message);

      var bar      = foobarDiv.querySelector(Settings.barSelector),
          parent   = document.body;

      css(bar, {
        color: Colors[context].color,
        background: Colors[context].backgroud,
        'border-bottom': '1px solid ' + Colors[context].border
      });

      parent.appendChild(foobarDiv);
      foobarDiv.style.opacity = 0;
      window.getComputedStyle(foobarDiv).opacity;
      foobarDiv.style.opacity = 0.95;

      return foobarDiv;
    };

    ngFoobar.hideMessage = function() {
      document.getElementById('ng-foobar').style.opacity = 0;
    };

    function afterTransition() {
      if (ngFoobar.isRendered() && window.getComputedStyle(document.getElementById('ng-foobar')).opacity == 0) {
        removeElement(document.getElementById('ng-foobar'));
      }
    }

    /**
     * Checks if the progress bar is rendered.
     */

    ngFoobar.isRendered = function() {
      return !!document.getElementById('ng-foobar');
    };

    /**
     * (Internal) Applies css properties to an element, similar to the jQuery
     * css method.
     *
     * While this helper does assist with vendor prefixed property names, it
     * does not perform any manipulation of values prior to setting styles.
     */

    var css = (function() {
      var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
          cssProps    = {};

      function camelCase(string) {
        return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
          return letter.toUpperCase();
        });
      }

      function getVendorProp(name) {
        var style = document.body.style;
        if (name in style) return name;

        var i = cssPrefixes.length,
            capName = name.charAt(0).toUpperCase() + name.slice(1),
            vendorName;
        while (i--) {
          vendorName = cssPrefixes[i] + capName;
          if (vendorName in style) return vendorName;
        }

        return name;
      }

      function getStyleProp(name) {
        name = camelCase(name);
        return cssProps[name] || (cssProps[name] = getVendorProp(name));
      }

      function applyCss(element, prop, value) {
        prop = getStyleProp(prop);
        element.style[prop] = value;
      }

      return function(element, properties) {
        var args = arguments,
            prop,
            value;

        if (args.length == 2) {
          for (prop in properties) {
            value = properties[prop];
            if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
          }
        } else {
          applyCss(element, args[1], args[2]);
        }
      }
    })();

    /**
     * (Internal) Removes an element from the DOM.
     */

    function removeElement(element) {
      element && element.parentNode && element.parentNode.removeChild(element);
    }

    return ngFoobar;
  }]);

