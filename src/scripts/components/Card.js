export default class Card {
    constructor({place, link}, cardTemplateSelector, handleCardClick) {
        this._name = place;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
    }

    _handleLikeIcon(e) {
        e.target.classList.toggle('post__like_liked');
    }

    _handleDeleteCard(e) {
        e.stopPropagation();
        this._card.closest(".post").remove();
    }

    _setEventListeners() {
        const remove = this._card.querySelector(".post__remove");
        const like = this._card.querySelector(".post__like");
        
        remove.addEventListener("click", this._handleDeleteCard);
        like.addEventListener("click", this._handleLikeIcon);
        this._cardImage.addEventListener('click', () => this._handleCardClick());
    }

    _getCardTemplate() {
        const postTemplate = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
        return postTemplate;
    }

    generateCard() {
        const postElement = this._getCardTemplate();
        this._card = postElement;
        this._card.querySelector(".post__caption").textContent = this._name;
        
        this._cardImage = this._card.querySelector(".post__image");
        this._cardImage.setAttribute("style", `background-image: url(${this._link})`);
        this._setEventListeners();
        return this._card;
    }
}