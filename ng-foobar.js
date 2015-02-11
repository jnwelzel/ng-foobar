/* ngFoobar, (c) 2014 Jonathan Welzel - http://jonwelzel.com/ng-foobar
 * @license MIT */

angular.module('ngFoobar.provider', ['ngFoobar.directive'])
  .provider('ngFoobar', function () {
    'use strict';

    this.successColors = {
      color: '#3C763D',
      background: '#DFF0D8',
      border: '#D6E9C6'
    };

    this.warningColors = {
      color: '#C09853',
      background: '#FCF8E3',
      border: '#FBEED5'
    };

    this.infoColors = {
      color: '#1E90FF',
      background: '#FFF',
      border: '#EBEBEB'
    };

    this.errorColors = {
      color: '#B94A48',
      background: '#F2DEDE',
      border: '#EED3D7'
    };
    
    this.displayTime = 3000;
    this.autoClose = false;

    this.colors = [];
    this.colors['success'] = this.successColors;
    this.colors['warning'] = this.warningColors;
    this.colors['info'] = this.infoColors;
    this.colors['error'] = this.errorColors;

    this.$get = ['$document', '$window', '$compile', '$rootScope', '$timeout',
      function ($document, $window, $compile, $rootScope, $timeout) {
        var Colors = this.colors,
            $scope = $rootScope,
            $body  = $document.find('body'),
            SuccessColors = this.successColors,
            InfoColors = this.infoColors,
            WarningColors = this.warningColors,
            ErrorColors = this.errorColors,
            Settings = {
              autoClose: this.autoClose,
              displayTime: this.displayTime,
              opacity: 0.9
            };
        var ngFoobarEl = $compile('<ng-foobar></ng-foobar>')($scope);
        $body.append(ngFoobarEl);

        var hide = function () {
          ngFoobarEl.css('top', '-200px');
        };
        ngFoobarEl.bind('click', hide);

        return {
          show: function(context, message) {
            ngFoobarEl.children('.ng-foobar-message').html(message);
            ngFoobarEl.css({color: Colors[context].color, backgroundColor: Colors[context].background, borderBottom: '1px solid ' + Colors[context].border})
            var self = this;
            ngFoobarEl.css({top: 0, opacity: Settings.opacity});
            if (Settings.autoClose) {
              $timeout(function(){
                hide();
              }, Settings.displayTime);
            }
          },
          configure: function(options) {
            var key, value;
            for (key in options) {
              value = options[key];
              if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
            }
            return this;
          },
          setAutoClose: function(autoClose, displayTime) {
            Settings.autoClose = autoClose;
            Settings.displayTime = displayTime;
          },
          setColors: function(context, colors) {
            Colors[context] = colors;
          },
          resetColors: function() {
            Colors['success'] = SuccessColors;
            Colors['warning'] = WarningColors;
            Colors['info'] = InfoColors;
            Colors['error'] = ErrorColors;
          },
          setOpacity: function(opacity) {
            Settings.opacity = opacity;
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
      template: '<div id="ng-foobar" class="bar"><div class="ng-foobar-message"></div></div>'
    };

    return directiveObj;
  }]);

angular.module('ngFoobar', ['ngFoobar.directive', 'ngFoobar.provider']);
