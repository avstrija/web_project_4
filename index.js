const edit = document.querySelector(".profile__edit-btn");
const add = document.querySelector(".profile__add-btn");

const containerEdit = document.querySelector(".modal__container_type_update");
const containerAdd = document.querySelector(".modal__container_type_create");
const containerView = document.querySelector(".modal__container_type_view");

const formUpdate = document.querySelector(".modal_goal_update");
const formCreate = document.querySelector(".modal_goal_create");

const fullviewImage = containerView.querySelector(".modal__fullview");
const fullviewCaption = containerView.querySelector(".modal__caption");

const closeAdd = containerAdd.querySelector(".modal__close-btn");
const closeEdit = containerEdit.querySelector(".modal__close-btn");
const closeView = containerView.querySelector(".modal__close-btn");


const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const inputUsername = document.querySelector(".modal__input_content_username");
const inputBio = document.querySelector(".modal__input_content_bio");

const inputCaption = document.querySelector(".modal__input_content_place");
const inputLink = document.querySelector(".modal__input_content_link");

const postTemplate = document.querySelector(".post-template").content;
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

function toggleModalState(container) {
    container.classList.toggle('modal__container_invisible');
}

function addPost(name, link) {
    const postElement = postTemplate.cloneNode(true);
    postElement.querySelector(".post__caption").textContent = name;
    const cardImage = postElement.querySelector(".post__image");
    cardImage.setAttribute("style", `background-image: url(${link})`);
    const remove = postElement.querySelector(".post__remove");
    remove.addEventListener("click", (e) => {
        e.stopPropagation();
        e.target.closest(".post").remove();
    });
    const like = postElement.querySelector(".post__like");
    like.addEventListener("click", () => {
        like.classList.toggle('post__like_liked');
    });

    cardImage.addEventListener('click', () => {
        fullviewImage.src = link;
        fullviewImage.alt = name;
        fullviewCaption.textContent = name;
        toggleModalState(containerView);
    });
    // if (event!=="x") {
    //     // formCreate.reset();
    //     // event.preventDefault();
    //     // postsContainer.prepend(postElement);
    // }
    // else {
    //     postsContainer.append(postElement);
    // }
    return postElement;
}

cards.forEach((el) => {
    postsContainer.append(addPost(el.name, el.link));
});

function popUp() {
    inputUsername.value = username.textContent;
    inputBio.value = bio.textContent;
    toggleModalState(containerEdit);
}

function update(event) {
    username.textContent = inputUsername.value;
    bio.textContent = inputBio.value;
    toggleModalState(containerEdit);
    event.preventDefault();
}

edit.addEventListener("click", popUp);
add.addEventListener("click", () => {
    toggleModalState(containerAdd);
});
closeAdd.addEventListener("click", () => {
    toggleModalState(containerAdd);
});
closeEdit.addEventListener("click", () => {
    toggleModalState(containerEdit);
});
closeView.addEventListener("click", () => {
    toggleModalState(containerView);
});

formUpdate.addEventListener("submit", update);
formCreate.addEventListener("submit", () => {
    toggleModalState(containerAdd);
    event.preventDefault();
    postsContainer.prepend(addPost(inputCaption.value, inputLink.value));
    formCreate.reset();
    });

