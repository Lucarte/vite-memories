import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost/api/auth",
	withCredentials: true,
	withXSRFToken: true,
});

export default http;
