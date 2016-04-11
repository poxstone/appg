(function() {
'use strict'

var app = angular.module('myApp', ['ngRoute', 'ui.materialize', 'ui-notification', '$eforModal'])
app.config(configView);
app.config(configNotification);
app.config(configRoute);
app.service('apiRest', ['$http', '$log', 'Notification', ApiRest]);
app.factory('changeRoute', ['$rootScope', '$route', '$log', ChangeRoute]);
app.controller('mainController', ['$scope', '$route', '$routeParams', '$location',
  '$http', '$log', 'changeRoute', 'Notification', 'apiRest', 'eforModal', MainController]);
app.controller('list_controller', ['$scope', ListController]);
app.controller('ctl_b', ['$scope', CtlB]);

function MainController($scope, $route, $routeParams, $location, $html,
  $log, changeRoute, notification, apiRest, $eforModal) {
  var mn = this;
  mn.lists;
  mn.item_to_send = {}; // To send for add or update item
  // Mn.route = $route;mn.location = $location;mn.routeParams = $routeParams;

  // Register change template listenen
  changeRoute();
  // On load html page
  angular.element(document).ready(function () {
    loadList();
    
  });

  // Function load list
  function loadList() {
    var callbacks = {
      success : function(res){
        mn.list = res;
      },
      failed : function(res) {
        loadList();
      }
    };

    apiRest.getList( callbacks );

  }

  mn.openEditItem = function(item) {
    // Prepare item for modal edit
    mn.item_to_send = angular.copy( item );
    var callback_close = function() {
    mn.item_to_send = {};
    };

    $eforModal.open({templateUrl:'/static/html/list_add.html', type:'success',
      scope: mn, onClose:callback_close });

  }

  mn.openSaveItem = function() {
    var callback_close = function() {
      mn.item_to_send = {};
    };

    $eforModal.open({templateUrl:'/static/html/list_add.html', type:'success',
      scope: mn, onClose:callback_close });

  }

  mn.saveItem = function() {
    // Configure callbacks functions fo APIRest
    var callbacks = {
      success : function(res) {
        loadList();
      },
      failed : function(res) {
        // LoadList();
        $log.debug('error to save: ' + item.example_name);
      }
    };

    // Item_to_send = into modal form
    apiRest.saveList( mn.item_to_send, callbacks );
    $eforModal.close();
    notification('Guardando...');

  }

  mn.deleteIten = function(item) {
    $eforModal.confirm({
      title: 'Delete item',
      subtitle: item.example_name,
      confirm_text: 'Delete',
      cancel_text: 'Cancel',
      confirmAction: function() {

        var callbacks = {
          success : function(res) {
            notification('Delete item: ' + item.example_name);
            loadList();
          },
          failed : function(res) {
            $log.debug('error to delete: ' + item.example_name);
          }
        };

        // Item_to_send = into modal form
        apiRest.deleteList( item, callbacks );

      },
      cancelAction: function() {
        $log.debug('Cancel delete');
      }
    });

  }

};

//----------------------------
function ListController($scope) {
  var ca = $scope;
  ca.name = 'controlador A';
}

function CtlB($scope) {
  cb = $scope;
  cb.name = 'controlador B';
}

// Services
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

function ChangeRoute( $rootScope, $route, $log) {
  return function() {
    $rootScope.$on( '$routeChangeSuccess', function() {
      $log.debug('change route: ', $route.current.loadedTemplateUrl );
    });

  }
};

// Configurators
function configView($interpolateProvider, $httpProvider, $provide) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');

};

function configRoute($routeProvider, $locationProvider) {
   $routeProvider
    .when('/list', {
      templateUrl: '/static/html/list.html',
      controller: 'list_controller',
      resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
        }
      }
    
    })
    .when('/b', {
      templateUrl: '/static/html/b.html',
      controller: 'ctl_b',
    })
    .otherwise({
      redirectTo: '/list'
    });
};

function configNotification (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 20,
      verticalSpacing: 10,
      horizontalSpacing: 10,
      positionX: 'left',
      positionY: 'bottom'
    });
};

})();