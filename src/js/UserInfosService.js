/**
* Service that persists and retrieves datas from localStorage
*/
(function() {
    'use strict';

    angular.module('userInfos')
    .service('LocalUserInfosService', function($q){

        var STORAGE_ID = 'angular-tab-form';

        this.collection = JSON.parse( localStorage.getItem( STORAGE_ID ) ) || [];

        this._getLocalStorage = function () {
            return this.collection;
        };

        this._getFromLocalStorage = function ( somename ) {

            // if no localStorage, init the localStorage
            if ( typeof localStorage.getItem( STORAGE_ID ) === "undefined" || localStorage.length === 0 )
                this.insert( somename );

            // variables
            var current,
                i = this.collection.length,
                n = somename.toLowerCase();

            // move inside indexes while not 0 and 'somename' not found in localStorage
            while( --i >= 1 && n !== this.collection[i].name.toLowerCase() ) {}

            // return complete obj
            return ( this.collection[i].name.toLowerCase() === somename.toLowerCase() ?
                        {
                            store: this.collection[i],
                            name: somename
                        } :
                        {}
            );

        };

        this._saveToLocalStorage = function ( collection ) {
            localStorage.setItem( STORAGE_ID, JSON.stringify( collection ) );
        };

        this.get = function ( somename ) {
            return ( somename === undefined ?
                        $q.when( this._getLocalStorage() ) :
                        $q.when( this._getFromLocalStorage( somename ) )
                    );
        };

        this.insert = function ( something ) {
            this.collection.push( something );
            return $q.when( this._saveToLocalStorage( this.collection ) );
        };

    });

})();
