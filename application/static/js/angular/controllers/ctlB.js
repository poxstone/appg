(function() {
  'use strict';

  angular.module('myApp').controller('ctl_b', ['$scope', ctlB]);

  function ctlB($scope) {
    var cb = $scope;
    cb.name = 'controlador B';
  }

})();