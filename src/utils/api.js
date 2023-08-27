import { configApi } from "./constants";

class Api {
    constructor(options) {
        this.url = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo() {
        return fetch(this.url + '/users/me', {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(this.url + '/cards', {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    editProfileInfo(name, about) {
        return fetch(this.url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._handleResponse);
    }

    createCard(name, link) {
        return fetch(this.url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    changeLikeCardStatus(id, statusLike) {
        if (statusLike === false) {
            return fetch(this.url + /cards/ + `${id}` + '/likes', {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._handleResponse);
        } else {
            return fetch(this.url + /cards/ + `${id}` + '/likes', {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._handleResponse);
        }
    }

    updateAvatar(newAvatar) {
        return fetch(this.url + '/users/me/avatar ', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatar
            })
        })
        .then(this._handleResponse);
    }
}

export const api = new Api(configApi);