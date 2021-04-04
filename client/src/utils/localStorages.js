import { isEmpty } from 'lodash-es'

export const LocalStorages = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refresh-token',
  USER: 'user',
  CREDENTIALS: 'credentials',
  setCredentials(credentials) {
    if (!isEmpty(credentials)) {
      localStorage.setItem(this.CREDENTIALS, JSON.stringify(credentials))
    }
  },

  getCredentials() {
    return JSON.parse(localStorage.getItem(this.CREDENTIALS))
  },

  setToken(token) {
    localStorage.setItem(this.TOKEN, token)
  },

  getToken() {
    const { token } = this.getCredentials()
    return token
  },
  getRefreshToken() {
    const { refreshToken } = this.getCredentials()
    return refreshToken
  },

  getUser() {
    const { user } = this.getCredentials()
    return user
  },

  clearCredentials() {
    localStorage.removeItem(this.CREDENTIALS)
  },

  remove(key) {
    localStorage.removeItem(key)
  },
  get(key) {
    const value = localStorage.getItem(key)
    return value
  },
}
