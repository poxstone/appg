(function() {
  'use strict';

  // Services
  app.service('apiRest', ['$http', '$log', 'Notification', ApiRest]);
  function ApiRest( $http, $log, notification) {

    this.getList = function(callbacks) {

      $http( {url:'/ini_list', method:'POST' } ).then(
          function(response) {
            var res = response.data.results;

            if (callbacks.success)
              callbacks.success( res );

            $log.debug( 'List loaded: ', response );
            notification( res.length + ' items finded.');
            window.realoadMDLDOM();

          },
          function(response) {

            if (callbacks.failed)
              callbacks.failed( response );

            $log.error( 'Server issue in list: ', response );
            notification.error( response.statusText + ': ' + response.status );
          }
        );
    };

    this.saveList = function(to_send, callbacks) {
      var data = angular.copy( to_send );
      var url = data.example_id ? '/ini_update' : '/ini_put';
      var options = {
        url: url,
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        data:data
      };

      $http( options ).then(
        function(response) {
          var res = response.data.results;

          if (callbacks.success)
            callbacks.success( res );

          $log.debug( 'Item save: ', response );
          notification( 'Server items saved.');

        },
        function(response) {

          if (callbacks.failed)
            callbacks.failed( response );

          $log.error( 'Server issue on save item: ', response );
          notification.error( response.statusText + ': ' + response.status );
        }
      );
    };

    this.deleteList = function(to_send, callbacks) {
      var data = angular.copy( to_send );
      $log.debug('elemento: ',data);
      var options = {
        url:'/ini_delete',
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        data:data
      };
      $http( options ).then(
        function(response) {
          var res = response.data.results;

          if (callbacks.success)
            callbacks.success( res );

          $log.debug( 'Item delete: ', response );
          notification( 'Server Item delete.');

        },
        function(response) {

          if (callbacks.failed)
            callbacks.failed( response );

          $log.error( 'Server issue on delete item: ', response );
          notification.error( response.statusText + ': ' + response.status );
        }
      );
    };

  }

})();