(function() {
  'use strict';

  app.controller('ctl_b',['$scope', CtlB]);

  function CtlB($scope) {
    cb = $scope;
    cb.name = 'controlador B';
  }

})();