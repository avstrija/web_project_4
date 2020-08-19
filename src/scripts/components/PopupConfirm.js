import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector, formSelector) {
        super(popupSelector);
        this._formElement = document.querySelector(formSelector);
    }

    setSubmitAction(action) {
        this._handleSubmitForm = action;
    }

    _handleLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = "...Loading";
        }
        else {
            this._submitButton.textContent = this._initialText;
        }
    }

    setEventListeners() {
        this._submitButton = this._formElement.querySelector(".modal__save-btn");
        this._initialText = this._submitButton.textContent;
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleLoading(true);
            this._handleSubmitForm();
            this._handleLoading(false);
            this.close();
        });
        
        super.setEventListeners();
    }
}