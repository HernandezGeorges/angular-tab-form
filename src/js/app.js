/**
 * Main UserProfile app module
 *
 * @type {angular.module}
 */
(function() {
    'use strict';

    angular.module( 'userInfos', ['ui.router', 'ngImgCrop'])

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
        });

        // set the default activated tab with the first state
        $urlRouterProvider.otherwise('/profile');

    }])

    .run([ '$rootScope', '$state',
    function ( $rootScope, $state ) {

        // a bit of control in case we want the forms to be filled one after the other
        $rootScope.$on('$stateChangeStart', function( e, toState, fromState ) {
            if( toState.name === 'invoicing' && $rootScope.transitionTo.invoicing === false ) {
                e.preventDefault();
                $state.go( 'profile', { notify: false } );
            }
            if( toState.name === 'branch' && $rootScope.transitionTo.branch === false ) {
                e.preventDefault();
                $state.go( 'invoicing', { notify: false } );
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
