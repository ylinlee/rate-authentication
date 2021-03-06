(function() {
    'use strict';

  angular
    .module('rateApp.rate-authentication',[
      'ui.router'
    ]);
})();

(function() {
    'use strict';

  angular.module('rateApp.rate-authentication')
    .controller('RateLoginController', RateLoginController);

  RateLoginController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$timeout', 'RateAuthService'];

  function RateLoginController($scope, $rootScope, $stateParams, $state, $timeout, RateAuthService) {
    var vm = this;
    vm.login = login;
    vm.message = '';
    vm.credentials = {
      username: '',
      password: ''
    };
    vm.hasError = false;

    function login(credentials) {
      RateAuthService.login(credentials).then(function () {
        vm.hasError = false;
        $state.go($stateParams.lastState);
      }, function (response) {
        vm.hasError = true;
        vm.message = response;
        $timeout(function(){
          vm.hasError = false;
          vm.message = '';
        }, 2000);
      });
    }
  }

})();

(function() {
    'use strict';

    angular.module('rateApp.rate-authentication')
        .directive('rateLogin', RateLogin);

    function RateLogin() {
        return {
            restrict: 'E',
            templateUrl: 'src/rate-authentication/template/rate-login.template.html',
            controller: 'RateLoginController',
            controllerAs: 'rateLoginCtrl'
        };
    }
})();

(function() {
  'use strict';

  angular.module('rateApp.rate-authentication')
    .factory('RateAuthService', RateAuthService);

    RateAuthService.$inject = ['$q', 'RateSession'];

    function RateAuthService($q, RateSession) {

      function login(credentials) {
        var deferred = $q.defer();
        if(credentials.username === 'admin' && credentials.password === '1234'){
          RateSession.create(Date.now(), 'admin');
          deferred.resolve(RateSession.userId);
        } else {
          if(credentials.username !== 'admin') {
            deferred.reject('Usuario incorrecto');
          } else if(credentials.password !== '1234') {
            deferred.reject('Contraseña incorrecta');
          }
        }
        return deferred.promise;
      }

      function isAuthenticated() {
        return !!RateSession.userId;
      }

      function logout() {
        RateSession.destroy();
      }

      return {
        login: login,
        isAuthenticated: isAuthenticated,
        logout: logout
      };
    }
})();

(function() {
  'use strict';

  angular.module('rateApp.rate-authentication')
    .service('RateSession', RateSession);

  function RateSession() {
    var vm = this;
    vm.id = '';
    vm.userId = '';
    vm.create = create;
    vm.destroy = destroy;

    function create(sessionId, userId) {
      vm.id = sessionId;
      vm.userId = userId;
    }

    function destroy() {
      vm.id = null;
      vm.userId = null;
    }
  }
})();

(function() {'use strict';angular.module('rateApp.rate-authentication').run(['$templateCache', function($templateCache) {$templateCache.put('src/rate-authentication/template/rate-login.template.html','<style>#login-wrapper {\r\n    margin-top: 50px;\r\n}\r\n\r\n.alert {\r\n    position: absolute;\r\n    width: calc(100% - 30px);\r\n}\r\n\r\n.animate-if.ng-enter,\r\n.animate-if.ng-leave {\r\n    transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;\r\n}\r\n\r\n.animate-if.ng-enter,\r\n.animate-if.ng-leave.ng-leave-active {\r\n    opacity: 0;\r\n}\r\n\r\n.animate-if.ng-leave,\r\n.animate-if.ng-enter.ng-enter-active {\r\n    opacity: 1;\r\n}</style><div id="login-wrapper" class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><div class="login-panel panel panel-default"><div class="panel-heading"><h3 class="panel-title">Por favor loguese</h3></div><div class="panel-body"><form role="form" ng-submit="rateLoginCtrl.login(rateLoginCtrl.credentials)" novalidate><fieldset><div class="form-group"><input class="form-control" placeholder="Usuario" name="usuario" type="text" autofocus id="usuario" ng-model="rateLoginCtrl.credentials.username"></div><div class="form-group"><input class="form-control" placeholder="Password" name="password" type="password" id="password" ng-model="rateLoginCtrl.credentials.password"></div><button type="submit" class="btn btn-lg btn-success btn-block">Login</button></fieldset></form></div></div><div class="alert alert-danger animate-if" ng-if="rateLoginCtrl.hasError">Error al logarse. {{rateLoginCtrl.message}}</div></div></div></div>');}]);})();