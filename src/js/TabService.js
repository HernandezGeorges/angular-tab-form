/**
* Tabs depending on state
*
* Service (and not provider with $get, or factory with return {})
* because very "simple object instance", no operations
* and becaues value < service < factory < provider
*/
(function() {
    'use strict';

    angular.module('userInfos')

    .service('TabService', function(){

        this.tabs = {};

        this.tabs.profile =  {
                title: 'profile',
                uploader_label: 'Votre avatar',
                uploader_button_text: 'Charger une photo',
                uploader_caption: ''
            };

        this.tabs.billing = {
                title: 'invoicing'
            };

        this.tabs.agency = {
            title: 'branch',
            uploader_label: 'Votre logo',
            uploader_button_text: 'Charger un logo',
            uploader_caption: '2 Mo maximum'
        };

    });

})();
