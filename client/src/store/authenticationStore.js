import authAPI from 'api/authApi'
import { action, computed, makeObservable, observable } from 'mobx'
import { LocalStorages } from 'utils/localStorages'

export class AuthenticationStore {
  constructor(rootStore) {
    this.rootStore = rootStore
    this.user = null
    this.token = null
    this.refreshToken = null
    this.isLoading = false

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    const credentials = LocalStorages.getCredentials()
    if (credentials?.user) {
      this.setCredentials(credentials)
    }

    makeObservable(this, {
      user: observable,
      token: observable,
      isLoading: observable,
      refreshToken: observable,
      isAuthenticated: computed,
      login: action,
      logout: action,
    })
  }
  get isAuthenticated() {
    return !!this.user && !!this.token
  }

  async login(credentials) {
    this.setLoading(true)
    const _credentials = await authAPI
      .login(credentials)
      .catch((err) => {
        throw err
      })
      .finally(() => {
        this.setLoading(false)
      })
    this.setCredentials(_credentials)
  }

  setCredentials(credentials) {
    console.log(credentials)
    const { user, token, refreshToken } = credentials
    this.user = user
    this.token = token
    this.refreshToken = refreshToken
    LocalStorages.setCredentials(credentials)
  }

  logout() {
    LocalStorages.clearCredentials()
    this.user = null
    this.token = null
    this.refreshToken = null
  }
  setLoading(status) {
    this.isLoading = status
  }
}
