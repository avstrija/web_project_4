const edit = document.querySelector(".profile__edit-btn");
const overlay = document.querySelector(".page__overlay");
const form = document.querySelector(".edit-form");
const close = document.querySelector(".edit-form__close-btn");
const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const inputUsername = document.querySelector(".edit-form__input_content_username");
const inputBio = document.querySelector(".edit-form__input_content_bio");
const pics = document.querySelectorAll(".post__image");
let images = [
    './images/yosemite.jpg',
    './images/lake-louise.png',
    './images/bald-mountains.png',
    './images/latemar.png',
    './images/vanois.png',
    './images/lago-di-braies.png'
] 

for (i=0;i<images.length;i++) {
    pics[i].style.backgroundImage = "url('" + images[i] + "')";
    console.log(pics[i]);
}

function modal() {
    overlay.classList.toggle('page__overlay_invisible');
}

function popUp() {
    inputUsername.value = "";
    inputBio.value = "";
    inputUsername.placeholder = username.textContent;
    inputBio.placeholder = bio.textContent;
    modal();
}

function update(event) {
    username.textContent = inputUsername.value;
    bio.textContent = inputBio.value;
    modal();
    event.preventDefault();
}

edit.addEventListener("click", popUp);
close.addEventListener("click", modal);
form.addEventListener("submit", update);


