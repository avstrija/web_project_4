const edit = document.querySelector(".profile__edit-btn");
const overlay = document.querySelector(".page__overlay");
const form = document.querySelector(".edit-form");
const close = document.querySelector(".edit-form__close-btn");
const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const inputUsername = document.querySelector(".edit-form__input_content_username");
const inputBio = document.querySelector(".edit-form__input_content_bio");
const postGrid = document.querySelector(".photo-grid__posts");
let posts = {
    'Yosemite Valley':'./images/yosemite.jpg',
    'Lake Louise':'./images/lake-louise.png',
    'Bald Mountains':'./images/bald-mountains.png',
    'Latemar':'./images/latemar.png',
    'Vanois National...':'./images/vanois.png',
    'Lago di Braies':'./images/lago-di-braies.png'
};

let images = Object.values(posts);
let captions = Object.keys(posts);

function addPost(image, caption) {
    postGrid.innerHTML += `<li class="post">
        <div class="post__image" style="background-image: url('${image}');"></div>
        <div class="post__info">
            <p class="post__caption">${caption}</p>
            <button class="button post__like"></button>
        </div>
    </li>`;
}

function modal() {
    overlay.classList.toggle('page__overlay_invisible');
}

function popUp() {
    inputUsername.value = username.textContent;
    inputBio.value = bio.textContent;
    modal();
}

function update(event) {
    username.textContent = inputUsername.value;
    bio.textContent = inputBio.value;
    modal();
    event.preventDefault();
}

for (i=0;i<images.length;i++) {
    addPost(images[i],captions[i]);
}
edit.addEventListener("click", popUp);
close.addEventListener("click", modal);
form.addEventListener("submit", update);


