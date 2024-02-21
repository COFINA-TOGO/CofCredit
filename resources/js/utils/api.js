import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: "http://cofcredit.cofina.localhost/api",
  async onRequest({ options }) {
    const userToken = useCookie('userToken').value
    if (userToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${userToken}`,
      }
    }
  },
})
