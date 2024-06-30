import http from "./http";

// // Fetches the CSRF cookie
// export const getCsrfCookie = async () => {
// 	const response = await fetch("http://localhost/sanctum/csrf-cookie", {
// 		credentials: "include",
// 	});

// 	if (!response.ok) throw new Error("Failed to get CSRF cookie");
// 	console.log("CSRF cookie fetched", response);
// 	return response;
// };

// // LOGIN - NO AXIOS
// export const login = async (formData: FormData) => {
// 	// Fetch the CSRF cookie first
// 	await getCsrfCookie();

// 	// Fetch the CSRF token from the cookie
// 	const csrfToken = document.cookie
// 		.split("; ")
// 		.find((row) => row.startsWith("XSRF-TOKEN="))
// 		?.split("=")[1];

// 	console.log("CSRF token:", csrfToken);

// 	const headers: HeadersInit = {
// 		"Content-Type": "application/json",
// 		"X-XSRF-TOKEN": csrfToken || "",
// 		Accept: "application/json",
// 	};

// 	const response = await fetch(API_URL + "/auth/login", {
// 		method: "POST",
// 		body: formData,
// 		credentials: "include",
// 		headers,
// 	});

// 	console.log("Login response:", response);

// 	if (!response.ok) throw response;

// 	return response.json();
// };

// LOGIN
export const login = async (formData: FormData) => {
	const xsrfToken = await http("/sanctum/csrf-cookie");
	const res = await http.post("api/auth/login", formData, xsrfToken);
	if (res.status !== 200) throw res;
	return res.data;
};

// MEMORIES
export const getAllMemories = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const res = await http("/api/auth/memories");

	if (res.status !== 200) throw res;

	return res.data.Memories || [];
};

// LOGIN STATUS
// export const isLoggedIn = async () => {
// 	const res = await http("/api/auth/login/status");
// 	const data = await res.data;
// 	if (data.userId) return true;
// 	return false;
// };
//CHATGPTS idea
// LOGIN STATUS
export const isLoggedIn = async () => {
	try {
		const res = await http("/api/auth/login/status");
		console.log("Response from login status API:", res); // Debugging log

		const data = res.data;
		console.log("Parsed data:", data); // Debugging log

		// Check if loggedIn is true and userId is present
		if (data && data.loggedIn && data.userId) {
			console.log("User is logged in");
			return true;
		}

		console.log("User is not logged in");
		return false;
	} catch (error) {
		console.error("Error checking login status:", error);
		return false; // Return false if there is an error
	}
};

// CREATE MEMORY
export const postMemory = async (formData: FormData) => {
	try {
		// await new Promise((resolve) => setTimeout(resolve, 3000));

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
