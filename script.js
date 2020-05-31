const edit = document.querySelector(".profile__edit-btn");
const overlay = document.querySelector(".page__overlay");
const save = document.querySelector(".edit-form__save-btn");
const close = document.querySelector(".edit-form__close-btn");
const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const inputUsername = document.querySelector(".edit-form__input_content_username");
const inputBio = document.querySelector(".edit-form__input_content_bio");

edit.addEventListener("click", popUp);
close.addEventListener("click", disappear);
inputUsername.addEventListener("focus", removePlaceholder);
inputBio.addEventListener("focus", removePlaceholder);
inputUsername.addEventListener("focusout", addPlaceholder);
inputBio.addEventListener("focusout", addPlaceholder);
save.addEventListener("click", update);



function popUp() {
    inputUsername.placeholder = username.textContent;
    inputBio.placeholder = bio.textContent;
    overlay.style.display = "block";
}

function disappear() {
    overlay.style.display = "none";
}

function removePlaceholder() {
    this.placeholder = "";
}

function addPlaceholder() {
    if (this.value === "") {
        this.placeholder = "Type something...";
    }
    
}

function update() {
    if(inputUsername.value !== "") {
        username.textContent = inputUsername.value;
    }
    if(inputBio.value !== "") {
        bio.textContent = inputBio.value;
    }
    disappear();
}