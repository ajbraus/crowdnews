'use strict';

angular.module('CrowdNews.directives', [])
  .directive('digitalClock', function($interval) {
    return {
      restrict: 'E',
      scope: {},
      template: '<div ng-bind="now | date:\'EEEE MMM M, hh:mma\'"></div>',
      link: function (scope) {
        scope.now = new Date();
        var clockTimer = $interval(function() {
          scope.now = new Date();
        }, 1000);

        scope.$on('$destroy', function(){
          $interval.cancel(clockTimer);
        });
      }
    };
  })

  .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }])
  .directive('titleCase', function(){ //TODO DOES NOT WORK http://stackoverflow.com/questions/14419651/angularjs-filters-on-ng-model-in-an-input
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
          if (inputValue) {
            var words = inputValue.split(' ');
            for (var i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            }
            var transformedInput = words.join(' ');
            if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
            }         

            return transformedInput;     
          }    
        });
      }
    };
  });