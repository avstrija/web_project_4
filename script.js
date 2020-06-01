const edit = document.querySelector(".profile__edit-btn");
const overlay = document.querySelector(".page__overlay");
const form = document.querySelector(".edit-form");
const close = document.querySelector(".edit-form__close-btn");
const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const inputUsername = document.querySelector(".edit-form__input_content_username");
const inputBio = document.querySelector(".edit-form__input_content_bio");

function toggleModalState() {
    overlay.classList.toggle('page__overlay_invisible');
}

function popUp() {
    inputUsername.value = username.textContent;
    inputBio.value = bio.textContent;
    toggleModalState();
}

function update(event) {
    username.textContent = inputUsername.value;
    bio.textContent = inputBio.value;
    toggleModalState();
    event.preventDefault();
}

edit.addEventListener("click", popUp);
close.addEventListener("click", toggleModalState);
form.addEventListener("submit", update);


