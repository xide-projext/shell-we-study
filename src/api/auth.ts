export default class AuthService {
  private auth!: {
    token: string
    user: string
  }

  constructor() {
    this.token = () => window.localStorage.getItem(this.auth.token)
    this.user = () => window.localStorage.getItem(this.auth.user)
  }

  token(): string | null {
    // Token 가져올 수 있도록 해야함
    return window.localStorage.getItem(this.auth.token)
  }

  logout() {
    // Token 삭제 & API 호출 추가 필요
    window.localStorage.removeItem(this.auth.token)
    window.localStorage.removeItem(this.auth.user)
    location.reload()
  }

  user(): string | null {
    // User 가져올 수 있도록 해야함
    return window.localStorage.getItem(this.auth.user)
  }
}
