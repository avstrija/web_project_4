import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';

//Updating profile
const userInfo = new UserInfo({name: ".profile__username", job: ".profile__bio"});
userInfo.getUserInfo();
const profileUpdate = new PopupWithForm(".modal__container_type_update", ".modal_goal_update", ".profile__edit-btn",
    (e, data) => {
        userInfo.setUserInfo(data);
    },
);
profileUpdate.setEventListeners();

//Rendering and adding cards
const cards = [
    {
        place: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        place: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        place: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        place: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        place: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        place: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];
const handleFullView = (data) => {
    const modalView = new PopupWithImage(".modal__container_type_view");
            modalView.setEventListeners();
            modalView.open(data);
};
const feed = new Section({items: cards, renderer: (item) => {
    const card = new Card(item, ".post-template", () => handleFullView(item));
    const cardElement = card.generateCard();
    feed.addItem(cardElement);
    }
}, ".photo-grid__posts");
feed.renderItems();
const postCreate = new PopupWithForm(".modal__container_type_create", ".modal_goal_create", ".profile__add-btn",
    (e, data) => {
        e.preventDefault();
        const post = new Card(data, ".post-template", () => handleFullView(data));
        postCreate.clear();
        feed.addItem(post.generateCard());
    },
);
postCreate.setEventListeners();

//Form validation
const settings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-btn",
    inactiveButtonClass: "modal__save-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};
const editProfileValidation = new FormValidator(settings, ".modal_goal_update");
const addCardValidation = new FormValidator(settings, ".modal_goal_create");
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
