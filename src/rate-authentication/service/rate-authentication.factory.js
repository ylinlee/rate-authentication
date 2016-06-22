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
