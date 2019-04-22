// Testing
export const DEBUG = false
let SiteName = process.env.SITE_NAME || 'Svanq'
export const SITE_NAME = SiteName
export const SITE_SLOGAN = process.env.SITE_SLOGAN

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL
export const CONTACT_NUMBER = process.env.CONTACT_NUMBER
export const CONTACT_NUMBER_2 = process.env.CONTACT_NUMBER_2

export const PAYMENT_MODE = process.env.PAYMENT_MODE

// Backend API endpoints
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/v1'
export const REFRESH_TOKEN_URL = process.env.REFRESH_TOKEN_URL || '/auth'
export const SERVER_STATIC_CONTENT_URL = process.env.SERVER_STATIC_CONTENT_URL || 'http://localhost:3000/uploads'
/**
 * Key for local storage.
 *
 * Set the key to use in local storage to hold persistant data. If logged in,
 * you can see this key by going to Chrome > dev tools > application tab,
 * then choosing "Local Storage" and "http://localhost:8080".
 *
 * @type {string}
 */
export const STORAGE_KEY = SiteName
