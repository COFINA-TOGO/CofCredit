import { ofetch } from 'ofetch'

const $api = ofetch.create({

  baseURL: "http://cofcredit.cofina.localhost/api",
  async onRequest({ options }) {
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
    }

    const userToken = useCookie('userToken').value
    if (userToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${userToken}`,
      }
    }
  },
  async onResponseError({ request, response, options }) {
    // Log error
    console.log(response.status)
    if (response.status == 401) {
      // Remove "userToken" from cookie
      useCookie('userToken').value = null
      useCookie('userData').value = null

      // Remove "userAbilities" from cookie
      useCookie('userAbilityRules').value = null

      // Reset ability to initial ability
      ability.update([])
    }
  },
})

export { $api }
