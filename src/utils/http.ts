import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "https://104.248.123.220", // Fallback for development or troubleshooting
	withCredentials: true,
	withXSRFToken: true,
});

export default http;
