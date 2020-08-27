import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import './index.css';

const api = new Api({
        baseUrl: 'https://around.nomoreparties.co/v1/group-3',
        headers: {
          authorization: "72f35e11-165d-430a-b739-20a2fba93ad3",
          "Content-Type": "application/json"
        }
    });

api.getAppInfo()
    .then(([userInfoRes, cardInfoRes]) => {
        //PROFILE
        //Profile setup
        const userInfo = new UserInfo({name: ".profile__username", job: ".profile__bio", avatar: ".profile__pic"});
        userInfo.setUserInfo({username: userInfoRes.name, about: userInfoRes.about});
        userInfo.setAvatar({avatar: userInfoRes.avatar});
        const myId = userInfoRes._id;

        //Updating profile
        const profileUpdate = new PopupWithForm(".modal__container_type_update", ".modal_goal_update", ".profile__edit-btn",
        (e, data) => {
            userInfo.setUserInfo(data);
            api.setUserInfo({name: data.username, about: data.about})
                .then(() => profileUpdate.close())
                .catch(err => console.log(err));
        },
        () => {
            const values = userInfo.getUserInfo();
            document.querySelector("#username").value = values.username;
            document.querySelector("#about").value = values.bio;
        }
        );
        profileUpdate.setEventListeners();
        
        //Updating the avatar
        const avatarUpdate = new PopupWithForm(".modal__container_type_avatar", ".modal_goal_avatar", ".profile__userpic",
        (e, data) => {
            api.setUserAvatar({avatar: data.avatar})
                .then(() => {
                    userInfo.setAvatar({avatar: data.avatar});
                    avatarUpdate.close();
                })
                .catch(err => console.log(err));
        });
        avatarUpdate.setEventListeners();

        //IMAGE FEED
        //Setting up the fullview popup
        const modalView = new PopupWithImage(".modal__container_type_view");
        modalView.setEventListeners();
        
        //Setting up the image deleting popup
        const modalDelete = new PopupConfirm(".modal__container_type_delete", ".modal_goal_delete");
        
        //Setting up the post creating function
        const postsCreator = (data) => {
            return new Card(data, myId, ".post-template", () => {modalView.open(data)}, (e, cardId) => {
                e.stopPropagation();
                const cardToRemove = e.target.closest(".post");
                modalDelete.setEventListeners();
                modalDelete.open();
                modalDelete.setSubmitAction((e) => {
                    api.removeCard(cardId)
                        .then(() => {
                                cardToRemove.remove();
                                modalDelete.close();
                            })
                        .catch(err => console.log(err));
                        })
            }, (e, cardId) => {
                api.changeLikeCardStatus(cardId, !e.target.classList.contains('post__like_liked'))
                    .then((res) => {
                        e.target.nextElementSibling.textContent = res.likes.length;
                    })
                    .catch(err => console.log(err));
                e.target.classList.toggle('post__like_liked');
            })
        
        }

        //Setting up the image creating popup
        const postCreate = new PopupWithForm(".modal__container_type_create", ".modal_goal_create", ".profile__add-btn",
        (e, data) => {
            api.addCard(data)
                .then(res => {
                    const post = postsCreator(res);
                    postCreate.clear();
                    feed.addItem(post.generateCard());
                    postCreate.close();
                })
                .catch(err => console.log(err));
            });
        postCreate.setEventListeners();  
        
        //Rendering the initial cards
        const feed = new Section({items: cardInfoRes, renderer: (item) => {
            const card = postsCreator(item);
            feed.addItem(card.generateCard());
            }
        }, ".photo-grid__posts");
        feed.renderItems(); 
    })
    .catch(err => console.log(err));




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
const avatarUpdateValidation = new FormValidator(settings, ".modal_goal_avatar");
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
avatarUpdateValidation.enableValidation();