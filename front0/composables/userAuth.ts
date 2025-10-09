import { ref, readonly } from 'vue'

const user = ref<any>(null)

export function userAuth() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const login = async (email: string, password: string) => {
    const { data, error } = await userAuth(`${apiBase}/api/login`, {
      method: 'POST',
      body: { email, password },
      headers: { Accept: 'application/json' }
    })

    if (error.value) throw error.value

    const token = data.value?.token
    if (token) localStorage.setItem('auth_token', token)
    user.value = data.value?.user || null
    return user.value
  }

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await userAuth(`${apiBase}/api/register`, {
      method: 'POST',
      body: {
        name,
        email,
        password,
        password_confirmation: password
      },
      headers: { Accept: 'application/json' }
    })


    console.log(apiBase)
    if (error.value) throw error.value
    if (!data.value || !data.value.user) throw new Error('No user returned from API')

    const token = data.value.token
    if (token) localStorage.setItem('auth_token', token)

    // لاگین خودکار بعد از ثبت‌نام
    user.value = data.value.user
    return user.value
  }




  const fetchUser = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return null

    try {
      const { data } = await userAuth(`${apiBase}/api/me`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
      })
      user.value = data.value?.user || null
    } catch {
      user.value = null
    }
    return user.value
  }

  const logout = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    await userAuth(`${apiBase}/api/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
    })
    user.value = null
    localStorage.removeItem('auth_token')
    navigateTo('/dashboard/login')
  }

  return {
    user: readonly(user),
    login,
    register,
    fetchUser,
    logout
  }
}
