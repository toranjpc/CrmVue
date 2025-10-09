export const useAuth = () => {
  const token = useState('token', () => null)
  const user  = useState('user', () => null)
  const api   = useNuxtApp().$api

  const setAuthHeader = () => {
    if (token.value) {
      api.setHeader('Authorization', `Bearer ${token.value}`)
    }
  }

  const register = async (payload) => {
    const res = await api('/auth/register', { method: 'POST', body: payload })
    token.value = res.token
    user.value = res.user
    setAuthHeader()
  }

  const login = async (payload) => {
    const res = await api('/auth/login', { method: 'POST', body: payload })
    token.value = res.token
    user.value = res.user
    setAuthHeader()
  }

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' })
    token.value = null
    user.value = null
  }

  const fetchMe = async () => {
    setAuthHeader()
    const res = await api('/auth/me')
    user.value = res
  }

  return { token, user, register, login, logout, fetchMe }
}
