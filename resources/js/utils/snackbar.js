import { reactive } from 'vue'
import { ApiError } from '@/utils/api'

/**
 * Snackbar global de l'application (affiché par AppSnackbar dans App.vue)
 */
export const snackbarState = reactive({
	visible: false,
	color: 'success',
	message: '',
})

/**
 * Affiche un message
 * @param {string} color - La couleur (success, error, warning, info)
 * @param {string} message - Le message (les retours à la ligne sont conservés)
 */
export const showSnackbar = (color, message) => {
	snackbarState.color = color
	snackbarState.message = message
	snackbarState.visible = true
}

/**
 * Affiche les erreurs renvoyées par l'API qui ne correspondent à aucun champ du formulaire
 * @param {object} errors - Les erreurs de la réponse ({ champ: [messages] })
 * @param {object} fieldErrors - Les erreurs déjà affichées sous les champs du formulaire
 */
export const showApiErrors = (errors, fieldErrors = {}) => {
	const messages = Object.entries(errors ?? {})
		.filter(([key]) => key !== 'sub_code' && !(key in fieldErrors))
		.flatMap(([, value]) => (Array.isArray(value) ? value : [value]))

	if (messages.length)
		showSnackbar('error', messages.join('\n'))
}

/**
 * Message d'erreur à afficher pour une exception levée par $apiOrThrow
 * @param {Error} error - L'exception
 * @param {string} fallback - Le message par défaut
 * @returns {string}
 */
export const errorMessage = (error, fallback) => (error instanceof ApiError && error.message ? error.message : fallback)
