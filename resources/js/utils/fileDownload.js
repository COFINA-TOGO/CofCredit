import JsFileDownloader from 'js-file-downloader'

/**
 * Télécharge un fichier protégé par le token de l'utilisateur connecté
 * La promesse est rejetée si l'API répond avec une erreur (403, 404...)
 * @param {string} url - L'URL du fichier
 * @param {string} fileName - Le nom du fichier enregistré
 * @returns {Promise}
 */
export const downloadAuthenticatedFile = (url, fileName) => new JsFileDownloader({
	url,
	headers: [
		{ name: 'Authorization', value: `Bearer ${useCookie('userToken').value}` },
		{ name: 'Accept', value: 'application/json' },
	],
	nameCallback: () => fileName,
})
