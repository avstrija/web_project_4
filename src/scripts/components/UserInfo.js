export default class UserInfo {
    constructor({name, job}) {
        this._userName = document.querySelector(name);
        this._userJob = document.querySelector(job);
    }

    getUserInfo() {
        this._inputUsername = document.querySelector("#username");
        this._inputBio = document.querySelector("#bio");

        this._inputUsername.value = this._userName.textContent;
        this._inputBio.value = this._userJob.textContent;
    }

    setUserInfo({username, bio}) {
        this._userName.textContent = username;
        this._userJob.textContent = bio;
    }
}