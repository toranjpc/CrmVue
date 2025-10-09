export default defineNuxtRouteMiddleware((to, from) => {
  const token = useState('token').value
  if (!token) {
    return navigateTo('/login')
  }
})
