(function() {
  'use strict';

  app.controller('list_controller', ['$scope', listController]);

  function listController($scope) {
    var ca = $scope;
    ca.name = 'controlador A';
  }

})();