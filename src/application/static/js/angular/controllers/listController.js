(function() {
  'use strict';

  app.controller('list_controller', ['$scope', ListController]);

  function ListController($scope) {
    var ca = $scope;
    ca.name = 'controlador A';
  }

})();