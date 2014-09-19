/* ngFoobar, (c) 2014 Jonathan Welzel - http://jonwelzel.com/ng-foobar
 * @license MIT */

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ngFoobar = factory();
  }

})(this, function() {
  var ngFoobar = {};

  ngFoobar.version = '0.0.1';

  ngFoobar.contexts = ['success', 'info', 'error', 'warning'];

  var Settings = ngFoobar.settings = {
    successColor: '#3C763D',
    successBgColor: '#DFF0D8',
    successBorderColor: '#D6E9C6',
    warningColor: '#C09853',
    warningBgColor: '#FCF8E3',
    warningBorderColor: '#FBEED5',
    infoColor: '#1E90FF',
    infoBgColor: '#FFF',
    infoBorderColor: '#EBEBEB',
    errorColor: '#B94A48',
    errorBgColor: '#F2DEDE',
    errorBorderColor: '#EED3D7',
    autoClose: true,
    displayTime: 3,
    barSelector: '[role="bar"]',
    parent: 'body',
    template: '<div class="ng-foobar" role="bar"></div>'
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

  ngFoobar.showMessage = function(context, message) {
    console.log('%s %s', context, message);

  };

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  ngFoobar.render = function(context, message) {
    if (ngFoobar.isRendered()) return document.getElementById('ng-foobar');

    var messageDiv = document.createElement('div');
    messageDiv.innerHTML = message;

    var foobarDiv = document.createElement('div');
    foobarDiv.id = 'ng-foobar';
    foobarDiv.innerHTML = Settings.template;
    foobarDiv.appendChild(messageDiv);

    var bar      = foobarDiv.querySelector(Settings.barSelector),
        parent   = document.querySelector(Settings.parent);

    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (parent != document.body) {
      addClass(parent, 'ng-foobar-custom-parent');
    }

    parent.appendChild(foobar);
    return foobarDiv;
  };

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
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return;

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element.
   * The list is wrapped with a single space on each end to facilitate finding
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return ngFoobar;
});

