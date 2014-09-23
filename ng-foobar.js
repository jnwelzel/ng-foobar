/* ngFoobar, (c) 2014 Jonathan Welzel - http://jonwelzel.com/ng-foobar
 * @license MIT */

angular.module('ngFoobar.provider', ['ngFoobar.directive'])
  .provider('ngFoobar', function () {
    'use strict';
    this.version = '0.0.1';

    this.success = {
      color: '#3C763D',
      background: '#DFF0D8',
      border: '#D6E9C6'
    };

    this.warning = {
      color: '#C09853',
      background: '#FCF8E3',
      border: '#FBEED5'
    };

    this.info = {
      color: '#1E90FF',
      background: '#FFF',
      border: '#EBEBEB'
    };

    this.error = {
      color: '#B94A48',
      background: '#F2DEDE',
      border: '#EED3D7'
    };

    this.colors = [];
    this.colors['success'] = this.success;
    this.colors['warning'] = this.warning;
    this.colors['info'] = this.info;
    this.colors['error'] = this.error;

    this.$get = ['$document', '$window', '$compile', '$rootScope', '$timeout',
      function ($document, $window, $compile, $rootScope, $timeout) {
        var Colors = this.colors,
            $scope = $rootScope,
            $body  = $document.find('body');
        var Settings = this.settings = {
          autoClose: true,
          displayTime: 3,
          barSelector: '#ng-foobar'
        };
        var ngFoobarEl = $compile('<ng-foobar></ng-foobar>')($scope);
        $body.append(ngFoobarEl);
        var animation;
        var animate = function(fn, time) {
          if(animation) { $timeout.cancel(animation); }
          animation = $timeout(fn, time);
        };

        var hide = function () {
          ngFoobarEl.css('opacity', '0');
          var self = this;
          animate(function () {
            ngFoobarEl.css('width', '0%');
          }, 400);
        };
        ngFoobarEl.bind('click', hide);

        return {
          show: function(context, message) {
            ngFoobarEl.children('.message').html(message);
            ngFoobarEl.css({color: Colors[context].color, backgroundColor: Colors[context].background, borderBottom: '1px solid ' + Colors[context].border})
            var self = this;
            animate(function () {
              ngFoobarEl.css({opacity: '0.8', width: '100%'});
            }, 100);
          },
          configure: function(options) {
            var key, value;
            for (key in options) {
              value = options[key];
              if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
            }
            return this;
          }
        };
      }
    ];
  });

angular.module('ngFoobar.directive', [])
  .directive('ngFoobar', ['$window', function ($window) {
    var directiveObj = {
      replace: true,
      restrict: 'E',
      link: function ($scope, $element, $attrs) {

      },
      template: '<div id="ng-foobar" class="bar"><div class="message"></div></div>'
    };

    return directiveObj;
  }]);

angular.module('ngFoobar', ['ngFoobar.directive', 'ngFoobar.provider']);
