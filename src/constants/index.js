// Testing
export const DEBUG = false

// Backend API endpoints
export const API_BASE_URL = 'http://localhost:3000/v1'
export const REFRESH_TOKEN_URL = '/auth'

/**
 * Key for local storage.
 *
 * Set the key to use in local storage to hold persistant data. If logged in,
 * you can see this key by going to Chrome > dev tools > application tab,
 * then choosing "Local Storage" and "http://localhost:8080".
 *
 * @type {string}
 */
export const STORAGE_KEY = 'vue-pizza'
