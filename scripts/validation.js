// I changed the function so that it doesn't rely on classname order anymore but keeps the modifiers instead of ids
const connectErrorInput = (input, form) => {
    const matchString = 'modal__input_content_';
    const inputType = [...input.classList].reduce((acc, className) => {
        const index = className.indexOf(matchString);
        if(index + 1) {
            acc = className.substr(index + matchString.length);
        }
        return acc;
    }, '');
    console.log(form.querySelector('.modal__error_type_' + inputType))
    return form.querySelector('.modal__error_type_' + inputType);
};

const showErrorMessage = (input, form, {errorClass, inputErrorClass, ...rest}) => {
    const error = connectErrorInput(input, form);
    error.textContent = input.validationMessage;

    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);
};

const hideErrorMessage = (input, form, {errorClass, inputErrorClass, ...rest}) => {
    const error = connectErrorInput(input,form); 
    error.textContent = "";

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
}

const checkInputValidity = (input, form, rest) => {
    if(input.validity.valid) {
        hideErrorMessage(input, form, rest);
    } else {
        showErrorMessage(input, form, rest);
    }
};

const checkAllInputsValidity = (inputs) => {
    return inputs.every((input) => input.validity.valid)
};

const toggleButtonState = (isValid, button, {inactiveButtonClass,...rest}) => {
    if (isValid) {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute("disabled");
    } else {
        button.classList.add(inactiveButtonClass);
        button.setAttribute("disabled", true);
    }
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
    const forms = [...document.querySelectorAll(formSelector)];
    forms.forEach((form) => {
        const inputs = [...form.querySelectorAll(inputSelector)];
        const button = form.querySelector(submitButtonSelector);
        form.addEventListener("submit", ((e) => {
            e.preventDefault()
            toggleButtonState(false, button, rest);
        }))
        
        inputs.forEach((input) => {
            input.addEventListener("input", ((e) => {
                checkInputValidity(input, form, rest);
                toggleButtonState(checkAllInputsValidity(inputs), button, rest);
            }))
        });
    });

};

enableValidation({
    formSelector: ".modal",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-btn",
    inactiveButtonClass: "modal__save-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  });