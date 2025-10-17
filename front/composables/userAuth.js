export default () => {
  const config = useRuntimeConfig()
  const token = useCookie('token', { sameSite: 'lax' })
  const user = useState('user', () => null)

  const headers = computed(() => (
    token.value ? { Authorization: `Bearer ${token.value}` } : {}
  ))

  const register = async (payload) => {
    try {
      const res = await $fetch('/auth/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: payload
      })
      token.value = res.token
      user.value = res.user
      return res
    } catch (err) {
      handleError(err)
    }
  }

  const login = async (payload) => {
    console.log(token.value)
    try {
      const res = await $fetch('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: payload
      })
      token.value = res.token
      user.value = res.user
      return res
    } catch (err) {
      handleError(err)
    }
  }

  const logout = async () => {
    try {
      await $fetch('/auth/logout', {
        baseURL: config.public.apiBase,
        method: 'POST',
        headers: headers.value
      })
    } catch (err) {
      console.warn('Logout error ignored:', err)
    } finally {
      token.value = null
      user.value = null
    }
  }

  const fetchMe = async () => {
    if (!token.value) return null

    try {
      const res = await $fetch('/auth/me', {
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
      })
      user.value = res
      return res
    } catch (err) {
      token.value = null
      user.value = null
      throw err
    }
  }


  const handleError = (err) => {
    const status = err?.status
    const msg = err?.data?.error || err?.data?.message || err?.message

    if (status === 401) {
      throw new Error('دسترسی غیرمجاز یا توکن منقضی شده است.')
    } else if (status === 422) {
      throw new Error('نام کاربری یا رمز عبور نادرست است.')
    } else if (status >= 500) {
      throw new Error('خطایی در سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.')
    } else {
      throw new Error(msg || 'خطای ناشناخته در ارتباط با سرور.')
    }
  }

  return { token, user, register, login, logout, fetchMe }
}
