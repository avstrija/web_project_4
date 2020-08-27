import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector, formSelector, inactiveButtonClass) {
        super(popupSelector);
        this._formElement = document.querySelector(formSelector);
        this._inactiveButtonClass = inactiveButtonClass;
    }

    open() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute("disabled");
        this._handleLoading(false);
        super.open();
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
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.setAttribute("disabled", true);
            this._handleLoading(true);
            this._handleSubmitForm();
        });
        
        super.setEventListeners();
    }
}