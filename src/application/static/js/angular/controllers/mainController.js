(function() {
  'use strict';

  app.controller('mainController', ['$scope', '$route', '$routeParams', '$location',
    '$http', '$log', 'changeRoute', 'Notification', 'apiRest', 'eforModal', MainController]);

  function MainController($scope, $route, $routeParams, $location, $html,
    $log, changeRoute, notification, apiRest, $eforModal) {
    var mn = this;
    mn.lists;
    mn.item_to_send = {}; // To send for add or update item
    // Mn.route = $route;mn.location = $location;mn.routeParams = $routeParams;
    mn.arrExample = [1,2,3,4,5,6,7,8,9,0];
    mn.objExample = [];
    mn.query = '';
    mn.query2 = '';

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

    // Function test array
    mn.getExample = function() {
      var callbacks = {
        success : function(res){
          mn.objExample = res;
        },
        failed : function(res) {
          loadList();
        }
      };

      apiRest.getList( callbacks );

    };

    mn.clearExampleList = function() {
      mn.objExample = [];
    };

    mn.toDo = function(item) {
      notification('notification ' + (item || 'nada'));
      console.log('evento: ', item)
    };

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

})();