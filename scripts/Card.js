const container = document.querySelector(".modal__container_type_view");

const toggleModalState = () => {
    if (container.classList.contains('modal__container_active')){
        document.removeEventListener("keydown", escKeyHandler)
    } else {
        document.addEventListener("keydown", escKeyHandler);
    }
    container.classList.toggle('modal__container_active');
}

const escKeyHandler = (e) => {
    if (e.key === "Escape") {
        toggleModalState(container);
    }
}

const handlePreviewPicture = (data) => {
    const fullviewImage = container.querySelector(".modal__fullview");
    const fullviewCaption = container.querySelector(".modal__caption");
    
    fullviewImage.src = data.link;
    fullviewImage.alt = data.name;
    fullviewCaption.textContent = data.name;
    
    toggleModalState();
}

export default class Card {
    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _handleLikeIcon(e) {
        e.target.classList.toggle('post__like_liked');
    }

    _handleDeleteCard(e) {
        e.stopPropagation();
        e.target.closest(".post").remove();
    }

    _setEventListeners() {
        const remove = this._card.querySelector(".post__remove");
        const like = this._card.querySelector(".post__like");
        
        remove.addEventListener("click", this._handleDeleteCard);
        like.addEventListener("click", this._handleLikeIcon);
        this._cardImage.addEventListener('click', () => handlePreviewPicture({name: this._name, link: this._link}));
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