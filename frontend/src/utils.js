export const BASE_URL = "http://127.0.0.1:8000/";
export const PROJECT_TITLE = "DEVCONNECT";

export const LOGIN_BTN_TEXT = "Login";
export const SIGNUP_BTN_TEXT = "Create Account";

export const SIGNUP_TITLE = "Create your account";
export const LOGIN_TITLE = "Login to your account";

export const INDEX_TITLE = "Welcome to Devconnect";

export const CREATE_POST_TITLE = "Share your thoughts...";
export const CREATE_POST_HELPER = "type here...";

export const HISTORY_TITLE = "History";
export const HISTORY_DEFAULT_MESSAGE = "Currently unavailable.";

export const SETTING_TITLE = "User Settings";

export let TOKEN = null;
export let USERNAME = null;

export async function withFetch(url, formData) {
	const response = await fetch(url, {
		method: "POST", 
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
	.then(response => response.json())
	.then(response => console.log(response.message, "----------------------", response))
	.catch(error => console.error("Error: ", error))

	return response;
}