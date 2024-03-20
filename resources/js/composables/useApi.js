import { createFetch } from '@vueuse/core'
import { destr } from 'destr'

export const useApi = createFetch({
  baseUrl: '/api',
  fetchOptions: {
    headers: {
      Accept: 'application/json',
    },
  },
  options: {
    refetch: true,
    async beforeFetch({ options }) {
      const userToken = useCookie('userToken').value
      if (userToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${userToken}`,
        }
      }

      return { options }
    },
    async afterFetch(ctx) {
      const { data, response } = ctx
      let parsedData = null
      try {
        parsedData = destr(data)
      }
      catch (error) {
        console.error(error)
      }
      return { data: parsedData, response }
    },
    async onFetchError(ctx) {
      const { data, response } = ctx
      let parsedData = null
      try {
        parsedData = destr(data)
      }
      catch (error) {
        console.error(error)
      }
      const userData = useCookie('userData')
      const router = useRouter()
      // const ability = useAbility()    alert("dada")

      console.log(router)
      if (response.status == 401) {
        // Remove "userToken" from cookie
        useCookie('userToken').value = null
        // Remove "userData" from cookie
        userData.value = null
        // Redirect to login page
        await router.push('/login')
        // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page
        // Remove "userAbilities" from cookie
        useCookie('userAbilityRules').value = null
        // Reset ability to initial ability
        // ability.update([])
      }
    }
  },
})
