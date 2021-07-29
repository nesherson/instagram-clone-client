const EMAIL_REGEXP = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const URL_REGEXP = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/);
export {EMAIL_REGEXP, URL_REGEXP};