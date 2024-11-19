import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
	withCredentials: true, // Ensures cookies are sent
});

// Interceptor to add CSRF token to headers for every request
http.interceptors.request.use(
	(config) => {
		const csrfToken = document.cookie.split("XSRF-TOKEN=")[1]; // Extract CSRF token from cookies
		if (csrfToken) {
			config.headers["X-CSRF-TOKEN"] = csrfToken; // Attach CSRF token to request headers
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Call this endpoint at the start of the session
http
	.get("/sanctum/csrf-cookie")
	.then(() => {
		console.log("CSRF cookie set successfully.");
	})
	.catch((err) => {
		console.error("Failed to set CSRF cookie:", err);
	});

export default http;
