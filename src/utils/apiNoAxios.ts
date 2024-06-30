// utils/api.js
import http from "./http";

const API_URL = "http://localhost/api";

// Fetches the CSRF cookie
export const getCsrfCookie = async () => {
	const response = await fetch("http://localhost/sanctum/csrf-cookie", {
		credentials: "include",
	});

	if (!response.ok) throw new Error("Failed to get CSRF cookie");
	console.log("CSRF cookie fetched", response);
	return response;
};

// LOGIN
export const login = async (formData: FormData) => {
	// Fetch the CSRF cookie first
	await getCsrfCookie();

	// Fetch the CSRF token from the cookie
	const csrfToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("XSRF-TOKEN="))
		?.split("=")[1];

	console.log("CSRF token:", csrfToken);

	const headers: HeadersInit = {
		"Content-Type": "application-json",
		"X-XSRF-TOKEN": csrfToken || "",
	};

	const response = await fetch(API_URL + "/auth/login", {
		method: "POST",
		body: formData,
		credentials: "include",
		headers,
	});

	console.log("Login response:", response);

	if (!response.ok) throw response;

	return response.json();
};

// MEMORIES
export const getAllMemories = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	try {
		const res = await http.get("/api/auth/memories");

		if (res.status !== 200) {
			throw new Error("Failed to fetch memories");
		}

		return res.data.Memories || [];
	} catch (error) {
		console.error("Error fetching memories:", error);
		throw error; // This will be caught by react-router-dom and trigger the errorElement
	}
};

// CREATE MEMORY
export const postMemory = async (formData: FormData) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		console.log("API Formdata: ", Object.fromEntries(formData));

		const res = await http.post("/api/auth/memory/create", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (res.status !== 201) {
			throw new Error(`Failed to create memory`);
		}

		return res.data || [];
	} catch (error) {
		console.error("Error creating memory:", error);
		throw error;
	}
};
