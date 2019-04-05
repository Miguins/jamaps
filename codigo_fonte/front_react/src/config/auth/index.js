class Auth {

    constructor() {
        this.auth = null
    }

    setToken(token) {
        this.auth = token
    }

    login(cb) {
        cb()
    }

    logout(cb) {
        this.auth = null
        cb()
    }

    isAuth() {
        return this.auth
    }

}

export default new Auth()