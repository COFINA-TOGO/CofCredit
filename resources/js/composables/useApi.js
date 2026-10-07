import { createFetch } from '@vueuse/core'
import { destr } from 'destr'
import { handleAuthErrors } from '@/utils/authErrors'
import { rememberListUrl } from '@/utils/listExport'

const parseData = data => {
  try {
    return destr(data)
  }
  catch (error) {
    console.error(error)

    return null
  }
}

const useApi = createFetch({
  baseUrl: '/api',
  fetchOptions: {
    headers: {
      Accept: 'application/json',
    },
  },
  options: {
    refetch: true,

    // En cas d'erreur (4xx/5xx), data contient quand même le corps { status, errors }
    updateDataOnError: true,
    async beforeFetch({ url, options }) {
      // Les exports Excel reprennent la dernière requête de chaque liste
      if ((options.method ?? 'GET') === 'GET')
        rememberListUrl(url)

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
      const parsedData = parseData(data)

      handleAuthErrors(response.status, parsedData)

      return { data: parsedData, response }
    },
    async onFetchError(ctx) {
      const { data, error, response } = ctx
      const parsedData = parseData(data)

      handleAuthErrors(response?.status, parsedData)

      return { data: parsedData, error }
    },
  },
})

export { useApi }
