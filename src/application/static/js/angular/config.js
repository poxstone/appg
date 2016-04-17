(function() {
  'use strict';

  app.config(configView);
  app.config(configNotification);
  app.config(configRoute);
  app.factory('changeRoute', ['$rootScope', '$route', '$log', ChangeRoute]);

  // routes
  function ChangeRoute( $rootScope, $route, $log) {
    return function() {
      $rootScope.$on( '$routeChangeSuccess', function() {
        $log.debug('change route: ', $route.current.loadedTemplateUrl );
      });

    }
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

  // Configurators
  function configView($interpolateProvider, $httpProvider, $provide) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');

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