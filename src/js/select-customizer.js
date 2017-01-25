/**
* The goal is to prevent the use of ugly html <select> elements
* and transform a list of label and radio button into a dropdown list
* as if the list was a select element.
* As Angular doesnt like hidden elements (no validation or submission)
* and Selects are ugly (already said!)
* The goal is to trick the user as if he sees a customized select box
* which will in fact be a simple but yet accessible list of radio button
* and guess what, Angular can validate and submit them too.
*
* @type {Object}
*/
var selectTransformer = {

    containerElement : '',
    displayElement   : '',
    displayText      : '',
    dataContainer    : '',
    dataList         : '',
    selectedElement  : '',

    // set the <label> which will display the selected text|value
    _setDisplayElement: function () {
        this.displayElement = this.containerElement.getElementsByTagName('label')[0];
    },

    // set display element toggling action
    __attachDisplayElementToggleAction: function() {
        var _this = this;
        _this.displayElement.addEventListener( 'click', function() {
            return _this.dataContainer.classList.contains( 'show' ) ?
                        _this.dataContainer.classList.remove( 'show' ) :
                        _this.dataContainer.classList.add( 'show' );
        });
    },

    // only hide container
    __hideContainer: function() {
        this.dataContainer.classList.remove( 'show' );
    },

    // set the text|value of the selected element on the Display element
    _setDisplayText: function () {
        this.displayText = this.selectedElement.value;
    },

    // insert the selected element value inside the display element
    _changeDisplayText: function () {
        this.displayElement.innerHTML = this.displayText;
    },

    // set the container of the data list
    _setDataContainer: function () {
        this.dataContainer = this.containerElement.getElementsByTagName('div')[0];
        this.__attachDisplayElementToggleAction();
    },

    // set the list elements
    _setDataList: function () {
        this.dataList = this.dataContainer.getElementsByTagName('input');
    },

    // set a reference to the selected element in the list
    _setSelected: function ( element ) {
        if( element !== undefined && element !== '' )
            this.__setSelectedOnSelection( element );
        else
            this.__setSelectedOnInit();

        this.__setSelectedClass();
    },

    __setSelectedOnSelection: function( element ) {
        this.selectedElement = element;
    },

    __setSelectedOnInit: function() {
        var i = this.dataList.length;
        while( --i > -1 && this.dataList[i].checked === false ) {}
        this.selectedElement = this.dataList[i] !== undefined && this.dataList[i] !== '' ? this.dataList[i] : '';
    },

    __setSelectedClass: function() {
        if( this.selectedElement !== undefined && this.selectedElement !== '' ) {
            var i = this.dataList.length - 1,
                _this = this;
            for(; i > -1; i-- ) {
                _this.dataList[i].parentElement.classList.remove( 'selected' );
            }
            this.selectedElement.parentElement.classList.add( 'selected' );
        }
    },

    __handleDisplayTextAndHideContainer: function ( e ) {
        var _this = this;
        return function() {
            _this._setSelected( e );
            _this._setDisplayText();
            _this._changeDisplayText();
            _this.__hideContainer();
        };
    },

    // attach action on each element in the list
    _onSelect: function () {
        var i = this.dataList.length - 1,
            _this = this;
        for(; i > -1; i-- ) {
            // !! prevent creating function in a loop (:)))
            _this.dataList[i].addEventListener('click', _this.__handleDisplayTextAndHideContainer( _this.dataList[i]), false);
        }
    },

    // dont change order or a mess will occur (:p)
    init: function ( id ) {
        this.containerElement = document.getElementById( id );
        this._setDisplayElement();
        this._setDataContainer();
        this._setDataList();
        this._onSelect();
        this._setSelected();
    }

};
