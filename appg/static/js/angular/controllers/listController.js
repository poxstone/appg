(function() {
  'use strict';

  angular.module('myApp').controller('list_controller', ['$scope',
    listController]);

  function listController($scope) {
    var ca = $scope;
    ca.name = 'controlador A';
  }

})();