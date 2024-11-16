import axios from "axios";

// Safely retrieve the CSRF token from meta tag
const csrfToken =
	(
		document.head.querySelector(
			'meta[name="csrf-token"]'
		) as HTMLMetaElement | null
	)?.content || "";

// Create an Axios instance with the CSRF token in the headers
const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
	withCredentials: true,
	headers: {
		"X-CSRF-TOKEN": csrfToken, // CSRF token, fallback to empty string if not found
	},
});

export default http;
