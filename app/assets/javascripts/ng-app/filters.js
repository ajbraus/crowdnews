'use strict';

angular.module('CrowdNews.filters', [])
  .filter('formatText', function (){
    return function(input) {
      if(!input) return input;
      var output = input
        //replace possible line breaks.
        .replace(/(\r\n|\r|\n)/g, '<br/>')
        //replace tabs
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
        //replace spaces.
        // .replace(/ /g, '&nbsp;');
        .replace(/\u00a0/g, " ");
        
        return output;
    };
  });