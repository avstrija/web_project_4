import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, buttonSelector, submitHandler, openHandler) {
        super(popupSelector);
        this._formElement = document.querySelector(formSelector);
        this._buttonElement = document.querySelector(buttonSelector);
        this._submitHandler = submitHandler;
        this._openHandler = openHandler;
    }
    _handleLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = "...Loading";
        }
        else {
            this._submitButton.textContent = this._initialText;
        }
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll(".modal__input");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.id] = input.value;
        });
        return this._formValues;
    }

    clear() {
        this._formElement.reset();
    }

    setEventListeners() {
        this._submitButton = this._formElement.querySelector(".modal__save-btn");
        this._initialText = this._submitButton.textContent;
        this._buttonElement.addEventListener("click", () => {
            if(this._openHandler) {
                this._openHandler();
            }
            this.open();
        });
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleLoading(true);
            this._submitHandler(e, this._getInputValues());
            this._handleLoading(false);
        });
        
        super.setEventListeners();
    }
}