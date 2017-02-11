/**
 * Main UserProfile app module
 *
 * @type {angular.module}
 */
(function() {
    'use strict';

    angular.module( 'userInfos', ['ui.router', 'ngImgCrop', 'ngCookies'])

    .config( [ '$stateProvider', '$urlRouterProvider', '$locationProvider', function( $stateProvider, $urlRouterProvider, $locationProvider ) {

        // user infos form state
        $stateProvider
            .state( 'profile', {
                url: '/profile',
                templateUrl: 'templates/profile-form.html',
            })

            // invoicing form state
            .state( 'invoicing', {
                url: '/invoicing',
                templateUrl: 'templates/invoicing-form.html',
            })

            // branch form state
            .state('branch', {
                url: '/branch',
                templateUrl: 'templates/branch-form.html',
            })

            // login form state
            .state('login', {
                url: '/',
                templateUrl: 'templates/login-form.html',
            });

        // set the default activated tab with the first state
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])

    .run([ '$rootScope', '$state', '$location', '$cookieStore', '$http',
    function ( $rootScope, $state, $location, $cookieStore, $http ) {

        $rootScope.$on('$stateChangeStart', function( e, toState, fromState ) {

            $rootScope.currentPage = toState.name;

            /*
            Very weak auth barrier,
            just for demo purpose
             */
            if(( toState.name === 'profile' && $rootScope.transitionTo.profile === false ) ||
                ( toState.name === 'invoicing' && $rootScope.transitionTo.profile === false ) ||
                ( toState.name === 'branch' && $rootScope.transitionTo.profile === false )) {
                    e.preventDefault();
                    $state.go( 'login', { notify: false } );
            }
        });
    }])

    .filter( 'debug', function() {
        return function( input ) {
            if ( input === '' ) return 'empty string';
                return input ? input : ( '' + input );
        };
    });

}());
