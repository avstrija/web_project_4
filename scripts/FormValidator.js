export default class FormValidator {
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;

    }

    _showErrorMessage(input) {
        const error = this._formElement.querySelector(`#error-${input.id}`);
        error.textContent = input.validationMessage;
    
        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideErrorMessage(input) {
        const error = this._formElement.querySelector(`#error-${input.id}`);
        error.textContent = "";
    
        error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(input) {
        if(input.validity.valid) {
            this._hideErrorMessage(input);
        } else {
            this._showErrorMessage(input);
        }
    }

    _checkAllInputsValidity(inputList) {
        return inputList.every((input) => input.validity.valid)
    }

    _toggleButtonState(isValid, buttonElement) {
        if (isValid) {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        } else {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        }
    }

    _setEventListeners(buttonElement) {
        const inputList = [...this._formElement.querySelectorAll(this._inputSelector)];

        inputList.forEach((input) => {
                    input.addEventListener("input", (() => {
                        this._checkInputValidity(input);
                        this._toggleButtonState(this._checkAllInputsValidity(inputList), buttonElement);
                    }))
                });
    }

    enableValidation() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._formElement.addEventListener("submit", ((e) => {
            e.preventDefault();
            this._toggleButtonState(false, buttonElement);
        }));

        this._setEventListeners(buttonElement);
    }
};