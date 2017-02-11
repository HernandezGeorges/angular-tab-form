/**
* UserInfos module controller
*
* @type {angular.module}
*/
(function () {
    'use strict';

    var userInfosCtrl = function( $rootScope, $scope, $state, TabService ) {

        var _this = this,
        tabs = TabService.tabs;

        $rootScope.transitionTo = {};
        $rootScope.transitionTo.profile = false;
        $rootScope.transitionTo.invoicing = false;
        $rootScope.transitionTo.branch = false;

        $rootScope.$on( '$stateChangeSuccess', function(){
            for ( var index in tabs ) {
                if ( tabs.hasOwnProperty( index ) ) {
                    tabs[index].active = $state.includes( tabs[index].title );
                }
            }
            _this.tabs = tabs;
        });
    };


    var loginCtrl = function ( $rootScope, $scope, $state, $location, FormService ) {

        this.submit = function( formIn ) {

            this.f = FormService.watchForm( formIn );

            if ( this.f.validated === true ) {
                $rootScope.transitionTo.profile = true;
                $location.path( '/profile' );
            } else {
                $rootScope.transitionTo.profile = false;
                $rootScope.transitionTo.invoicing = false;
                $rootScope.transitionTo.branch = false;
            }


        };
    };


    var profileCtrl = function( $rootScope, $scope, LocalUserService, FormService ) {

        selectTransformer.init( 'block_civilite' ); // (!)

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
            if ( this.f.formvalid )
                $rootScope.transitionTo.invoicing = true;
            else
                $rootScope.transitionTo.invoicing = false;
        };
    };


    var invoicingCtrl = function( $rootScope, $scope, LocalUserService, FormService ) {

        selectTransformer.init( 'block_country' ); // (!)

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
            if ( this.f.formvalid )
                $rootScope.transitionTo.branch = true;
            else
                $rootScope.transitionTo.branch = false;
        };
    };


    var branchCtrl = function( $rootScope, $scope, LocalUserService, FormService ) {

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
        };
    };


    angular
        .module('userInfos')
        .controller( 'userInfosCtrl', userInfosCtrl )
        .controller( 'loginCtrl', loginCtrl)
        .controller( 'profileCtrl', profileCtrl )
        .controller( 'invoicingCtrl', invoicingCtrl )
        .controller( 'branchCtrl', branchCtrl );


})();
