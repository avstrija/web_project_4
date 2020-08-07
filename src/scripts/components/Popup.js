export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add("modal__container_active");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("modal__container_active");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", (e) => {this.close()});
        const modal = this._popupElement.querySelector(".modal");
        modal.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        const close = this._popupElement.querySelector(".modal__close-btn");
        close.addEventListener("click", () => {this.close()});
    }
}