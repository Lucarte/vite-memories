import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
	withCredentials: true, // Ensures cookies are sent
});

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
