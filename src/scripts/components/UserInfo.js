export default class UserInfo {
    constructor({name, job, avatar}) {
        this._userName = document.querySelector(name);
        this._userJob = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
    }

    getUserId() {
        return this._userId;
    }

    setAvatar({avatar}) {
        this._avatar.src = avatar;
    }

    getUserInfo() {
        this._inputUsername = document.querySelector("#username");
        this._inputBio = document.querySelector("#bio");

        this._inputUsername.value = this._userName.textContent;
        this._inputBio.value = this._userJob.textContent;
    }

    setUserInfo({username, about}) {
        this._userName.textContent = username;
        this._userJob.textContent = about;
    }
}