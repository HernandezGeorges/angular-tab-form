/**
* Service (and not provider with $get, or factory with return {})
* because very "simple object instance", no operations
* and because value < service < factory < provider
*/
(function() {
    'use strict';

    var FormService = function() {

        return {

            watchForm: function( tabform ) {

                this.validated = false;
                this.submitted = true; // set validation flag

                if( tabform.$invalid ) {
                    this.formerror = tabform;
                    this.message = 'Erreur';

                } else {
                    this.validated = true;
                    this.formvalid = tabform;
                    this.message = 'ok';
                }

                return this;

            }
        };

    };

    angular
        .module( 'userInfos' )
        .factory( 'FormService', FormService );

})();
