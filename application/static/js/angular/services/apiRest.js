(function() {
  'use strict';

  // Services
  app.service('apiRest', ['$log', '$window', '$http', 'Notification', ApiRest]);

  function ApiRest($log, $window, $http, notification) {
    this.getList = function(callbacks) {

      $http( {url:'/ini/list', method:'POST' }).then(
          function(response) {
            var res = response.data.results;

            if (callbacks.success)
              callbacks.success( res );

            $log.debug('List loaded: ', response);
            notification( res.length + ' items finded.');
            window.reloadMDLDOM();

          },
          function(response) {

            if (callbacks.failed)
              callbacks.failed(response);

            $log.error('Server issue in list: ', response);
            notification.error(response.statusText + ': ' + response.status);
          }
        );
    };

    this.saveList = function(to_send, callbacks) {
      var data = angular.copy(to_send);
      var url = data.example_id ? '/ini/update' : '/ini/put';
      var options = {
        url: url,
        method:'POST',
        headers: {'Content-Type':'application/json'},
        data:data
      };

      $http(options).then(
        function(response) {
          var res = response.data.results;

          if (callbacks.success)
            callbacks.success(res);

          $log.debug('Item save: ', response);
          notification('Server items saved.');

        },
        function(response) {

          if (callbacks.failed)
            callbacks.failed(response);

          $log.error('Server issue on save item: ', response);
          notification.error(response.statusText + ': ' + response.status);
        }
      );
    };

    this.deleteList = function(to_send, callbacks) {
      var data = angular.copy(to_send);
      $log.debug('elemento: ',data);
      var options = {
        url:'/ini/delete',
        method:'POST',
        headers: {'Content-Type':'application/json'},
        data:data
      };
      $http(options).then(
        function(response) {
          var res = response.data.results;

          if (callbacks.success)
            callbacks.success(res);

          $log.debug('Item delete: ', response);
          notification('Server Item delete.');

        },
        function(response) {
          if (callbacks.failed)
            callbacks.failed(response);

          $log.error('Server issue on delete item: ', response);
          notification.error(response.statusText + ': ' + response.status);

        }
      );
    };

  }

})();