import { configApiAuthentification } from "./constants";

class Api {
    constructor(options) {
        this.url = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    onRegister(password, email) {
        return fetch(this.url + '/signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({password, email})
        })
        .then(this._handleResponse)
        .then((res) => {
            return res;
        })
    }

    onLogin(password, email) {
        return fetch(this.url + '/signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({password, email})
        })
        .then(this._handleResponse)
        .then((data) => {
            if (data.token){
                localStorage.setItem('jwt', data.token);
                return data;
            } else {
                return;
            }
        })
    }

    getContent(token) {
        return fetch(this.url + '/users/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(this._handleResponse)
        .then(data => data)
    }
}

export const apiAuthentification = new Api(configApiAuthentification);