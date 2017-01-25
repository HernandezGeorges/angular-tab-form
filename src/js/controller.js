/**
* UserInfos module controller
*
* @type {angular.module}
*/
(function () {
    'use strict';

    angular.module('userInfos')

    .controller( 'userInfosCtrl', ['$scope', '$state', 'TabService',
        function( $scope, $state, TabService ) {

            var _this = this,
                tabs = TabService.tabs;

            $scope.$on( '$stateChangeSuccess', function(){
                for ( var index in tabs ) {
                    if ( tabs.hasOwnProperty( index ) ) {
                        tabs[index].active = $state.includes( tabs[index].title );
                    }
                }
                _this.tabs = tabs;
            });
        }
    ])

    .controller( 'profileCtrl', function( $scope, LocalUserInfosService, FormService ) {

        selectTransformer.init( 'block_civilite' ); // (!)

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
        };
    })

    .controller( 'billingCtrl', function( $scope, LocalUserInfosService, FormService ) {

        selectTransformer.init( 'block_country' ); // (!)

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
        };
    })

    .controller( 'agencyCtrl', function( $scope, LocalUserInfosService, FormService ) {

        this.submit = function( formIn ) {
            this.f = FormService.watchForm( formIn );
        };
    });
})();
