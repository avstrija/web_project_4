import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector, formSelector) {
        super(popupSelector);
        this._formElement = document.querySelector(formSelector);
    }

    setSubmitAction(action) {
        this._handleSubmitForm = action;
    }

    setEventListeners() {
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleSubmitForm();
            this.close();
        });
        
        super.setEventListeners();
    }
}