import FormValidator from './FormValidator.js';
import Card from './Card.js';

const edit = document.querySelector(".profile__edit-btn");
const add = document.querySelector(".profile__add-btn");

const containerEdit = document.querySelector(".modal__container_type_update");
const containerAdd = document.querySelector(".modal__container_type_create");
const containerView = document.querySelector(".modal__container_type_view");

const formUpdate = document.querySelector(".modal_goal_update");
const formCreate = document.querySelector(".modal_goal_create");
const fullviewWrapper = containerView.querySelector(".modal__wrapper");

const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");

const inputUsername = document.querySelector("#username");
const inputBio = document.querySelector("#bio");

const inputCaption = document.querySelector("#place");
const inputLink = document.querySelector("#link");

const postsContainer = document.querySelector(".photo-grid__posts");

const cards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const settings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-btn",
    inactiveButtonClass: "modal__save-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

const editProfileValidation = new FormValidator(settings, formUpdate);
const addCardValidation = new FormValidator(settings, formCreate);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

const toggleModalState = (container) => {
    if (container.classList.contains('modal__container_active')){
        if (container===containerAdd) {
            formCreate.reset();
        }
        document.removeEventListener("keydown", escKeyHandler)
    } else {
        document.addEventListener("keydown", escKeyHandler);
    }
    container.classList.toggle('modal__container_active');
}

const escKeyHandler = (e) => {
    const activeModal = document.querySelector(".modal__container_active");
    if (e.key === "Escape") {
        toggleModalState(activeModal);
    }
}

cards.forEach((el) => {
    const post = new Card(el, ".post-template");
    postsContainer.append(post.generateCard());
});

const escModal = () => {
    const modalContainers = [...document.querySelectorAll(".modal__container")];
    const modals = [formUpdate, formCreate, fullviewWrapper];

    modalContainers.forEach((modalContainer) => {
        modalContainer.addEventListener("click", (e) => {
            toggleModalState(e.target);
      });
        const close = modalContainer.querySelector(".modal__close-btn")
        close.addEventListener("click", () => {
                toggleModalState(modalContainer);
            });
    });

    modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });
};

escModal();

edit.addEventListener("click", () => {
    inputUsername.value = username.textContent;
    inputBio.value = bio.textContent;
    toggleModalState(containerEdit);
});
add.addEventListener("click", () => {
    toggleModalState(containerAdd);
});

formUpdate.addEventListener("submit", () => {
    username.textContent = inputUsername.value;
    bio.textContent = inputBio.value;
    toggleModalState(containerEdit);
});
formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {name: inputCaption.value, 
                  link: inputLink.value};
    const post = new Card(data, ".post-template");
    postsContainer.prepend(post.generateCard());
    toggleModalState(containerAdd);
    });

