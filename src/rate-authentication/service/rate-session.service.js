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
