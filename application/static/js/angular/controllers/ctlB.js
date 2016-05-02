(function() {
  'use strict';

  app.controller('ctl_b' ,['$scope', ctlB]);

  function ctlB($scope) {
    cb = $scope;
    cb.name = 'controlador B';
  }

})();