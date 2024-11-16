import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
	withCredentials: true, // Ensure cookies are included
});

// Call CSRF endpoint explicitly
http.get("/sanctum/csrf-cookie").then(() => {
	console.log("CSRF cookie set");
});

export default http;
