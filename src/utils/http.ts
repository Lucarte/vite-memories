import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000", // Fallback for development or troubleshooting
	withCredentials: true,
	withXSRFToken: true,
});
console.log(import.meta.env.VITE_API_URL);

export default http;
