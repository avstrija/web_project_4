export default class UserInfo {
    constructor({name, job, avatar}) {
        this._userName = document.querySelector(name);
        this._userJob = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {username: this._userName.textContent, bio: this._userJob.textContent}
    }

    setAvatar({avatar}) {
        this._avatar.src = avatar;
    }

    setUserInfo({username, about}) {
        this._userName.textContent = username;
        this._userJob.textContent = about;
    }
}