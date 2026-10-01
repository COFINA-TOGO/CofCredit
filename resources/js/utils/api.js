import { ofetch } from 'ofetch'
import { handleAuthErrors } from '@/utils/authErrors'

const $api = ofetch.create({
  baseURL: '/api',

  // Les erreurs (4xx/5xx) ne lèvent pas d'exception : le corps { status, errors } est renvoyé comme une réponse normale
  ignoreResponseError: true,
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
    handleAuthErrors(response.status, response._data)
  },
})

/**
 * Erreur levée quand l'API répond avec un statut d'erreur
 */
export class ApiError extends Error {
  constructor(body) {
    const messages = Object.entries(body?.errors ?? {})
      .filter(([key]) => key !== 'sub_code')
      .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))

    super(messages.join('\n') || 'Erreur du serveur')
    this.status = body?.status
    this.errors = body?.errors
  }
}

/**
 * Comme $api, mais lève une ApiError si la réponse est une erreur
 * (pour les actions dont le résultat n'est pas lu)
 */
const $apiOrThrow = async (request, options) => {
  const response = await $api(request, options)
  if (response?.status >= 400)
    throw new ApiError(response)

  return response
}

export { $api, $apiOrThrow }
