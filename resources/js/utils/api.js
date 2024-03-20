import { ofetch } from 'ofetch'

const $api = ofetch.create({

  baseURL: '/api',
  onRequest:
    async ({ options }) => {
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
  onResponse: async ({ response }) => {
    console.log(response)
    if (response.status === 401) {
      // Redirection vers /login si le statut de la réponse est 401
      router.push('/login');
    }
  },
})

export { $api }
