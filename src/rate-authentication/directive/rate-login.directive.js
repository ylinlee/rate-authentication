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
