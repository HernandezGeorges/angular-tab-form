/**
* Service (and not provider with $get, or factory with return {})
* because very "simple object instance", no operations
* and because value < service < factory < provider
*/
(function() {
    'use strict';

    angular.module( 'userInfos' )

    .factory( 'FormService', function() {

        return {

            watchForm: function( tabform ) {

                this.validated = false;
                this.submitted = true; // set validation flag

                if( tabform.$invalid ) {
                    this.formerror = tabform;
                    this.message = 'Désolé, Quelques erreurs se sont glissées dans le formulaire!';

                } else {
                    this.validated = true;
                    this.formvalid = tabform;
                    this.message = 'Votre mise à jour a bien été enregistrée!';
                }

                return this;

            }
        };

    });
})();
