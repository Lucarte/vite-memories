import axios from "axios";

const http = axios.create({
	baseURL: "https://104.248.123.220",
	withCredentials: true,
	withXSRFToken: true,
});

export default http;
