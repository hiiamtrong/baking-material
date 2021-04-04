const { AuthenticationStore } = require('./authenticationStore')

export class RootStore {
  constructor() {
    this.authenticationStore = new AuthenticationStore(this)
  }
}
