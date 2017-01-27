/**
* UserInfos module controller
*
* @type {angular.module}
*/
(function () {
    'use strict';

    angular.module('userInfos')

    .controller( 'userInfosCtrl', ['$rootScope', '$scope', '$state', 'TabService',
        function( $rootScope, $scope, $state, TabService ) {

            var _this = this,
                tabs = TabService.tabs;

            $rootScope.transitionTo = {};
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
        }
    ])

    .controller( 'profileCtrl', function( $rootScope, $scope, LocalUserInfosService, FormService ) {

        selectTransformer.init( 'block_civilite' ); // (!)

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
            if ( this.f.formvalid )
                $rootScope.transitionTo.invoicing = true;
            else
                $rootScope.transitionTo.invoicing = false;
        };
    })

    .controller( 'invoicingCtrl', function( $rootScope, $scope, LocalUserInfosService, FormService ) {

        selectTransformer.init( 'block_country' ); // (!)
        
        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
            if ( this.f.formvalid )
                $rootScope.transitionTo.branch = true;
            else
                $rootScope.transitionTo.branch = false;
    };
    })

    .controller( 'branchCtrl', function( $rootScope, $scope, LocalUserInfosService, FormService ) {

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
        };
    });
})();
