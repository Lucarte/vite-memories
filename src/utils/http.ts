import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
	withCredentials: true, // Ensures cookies are sent
});

export default http;
