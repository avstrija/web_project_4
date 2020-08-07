import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({place, link}) {
        const fullviewImage = this._popupElement.querySelector(".modal__fullview");
        const fullviewCaption = this._popupElement.querySelector(".modal__caption");
    
        fullviewImage.src = link;
        fullviewImage.alt = place;
        fullviewCaption.textContent = place;

        super.open();
    }
}