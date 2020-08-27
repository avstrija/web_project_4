export default class Card {
    constructor(data, userId, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeIcon) {
        this._name = data.name;
        this._link = data.link;
        this._creator = data.owner._id;
        this._user = userId;
        this._likes = data.likes;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._id = data._id;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeIcon = handleLikeIcon;
    }
    _setEventListeners() {
        const remove = this._card.querySelector(".post__remove");
        const like = this._card.querySelector(".post__like");
        
        remove.addEventListener("click", (e) => this._handleDeleteClick(e, this._id));
        like.addEventListener("click", (e) => this._handleLikeIcon(e, this._id));
        this._cardImage.addEventListener('click', (e) => this._handleCardClick(e));
    }

    _getCardTemplate() {
        const postTemplate = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
        return postTemplate;
    }

    generateCard() { 
        this._card = this._getCardTemplate();
        this._card.querySelector(".post__caption").textContent = this._name;
        if (this._creator === this._user) {
            this._card.querySelector(".post__remove").classList.remove("post__remove_disabled");
        }
        
        this._cardImage = this._card.querySelector(".post__image");
        this._cardImage.setAttribute("style", `background-image: url(${this._link})`);
        this._card.querySelector(".post__like-count").textContent = this._likes.length;
        if(this._likes.some((like) => like._id === this._user)) {
            this._card.querySelector(".post__like").classList.add("post__like_liked");
        }
        this._setEventListeners();
        
        return this._card;
    }
}