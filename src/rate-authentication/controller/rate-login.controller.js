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
