import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, buttonSelector, submitHandler) {
        super(popupSelector);
        this._formElement = document.querySelector(formSelector);
        this._buttonElement = document.querySelector(buttonSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll(".modal__input");
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.id] = input.value;
        });
        return this._formValues;
    }

    clear() {
        this._inputList.forEach(input => {
            input.value = "";
        });
    }

    setEventListeners() {
        this._buttonElement.addEventListener("click", () => {this.open()});
        this._formElement.addEventListener("submit", (e) => {
            this._submitHandler(e, this._getInputValues());
            this.close();
        });
        
        super.setEventListeners();
    }
}