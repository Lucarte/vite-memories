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

export default http;
