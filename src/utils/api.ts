import { MemoryFile, MemoryValues, PatchValues } from "../types/MemoryValues";
import http from "./http";

// STATUS
export const loggedInData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	try {
		const res = await http("/api/auth/login/status");
		const data = res.data;
		// Check if loggedIn is true and userId is present
		if (data && data.loggedIn && data.userId) {
			return { loggedIn: true, isAdmin: data.isAdmin };
		}
		return { loggedIn: false, isAdmin: false };
	} catch (error) {
		console.error("Error checking login status:", error);
		return { loggedIn: false, isAdmin: false };
	}
};

// TO DO: Check if i need to extra add the xsrfToken
// REGISTER
export const register = async (formData: FormData) => {
	const res = await http.post("api/auth/register", formData);
	if (res.status !== 201) throw res;
	return res.data;
};

// LOGIN
export const login = async (formData: FormData) => {
	const res = await http.post("api/auth/login", formData);
	if (res.status !== 200) throw res;
	return res.data;
};

// LOGOUT
export const logout = async () => {
	const res = await http.post("/api/auth/logout");
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

// CREATE MEMORY
export const postMemory = async (formData: FormData) => {
	const res = await http.post("/api/auth/memory/create", formData);
	if (res.status !== 201) throw res;
	return res.data || [];
};

// DELETE MEMORY
export const deleteMemory = async (title: string) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const res = await http.delete(`/api/auth/memories/${title}`);
	if (res.status !== 200) throw res;
	return res.data;
};

// UPDATE MEMORY
export const patchMemory = async (id: number, data: PatchValues) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const res = await http.patch(`/api/auth/memories/${id}`, data);
	// const res = await http.patch(`/api/auth/memories/${id}`, formData);
	console.log(`Patching memory with ID ${id}:`, data);
	if (res.status !== 200) throw res;
	return res.data;
};

// // UPDATE MEMORY FILE
// export const patchFile = async (id: number, files: MemoryFile[]) => {
// 	await new Promise((resolve) => setTimeout(resolve, 3000));

// 	try {
// 		// Iterate over files and handle each one by its ID
// 		for (const file of files) {
// 			// Perform necessary actions for each file using its ID and other data
// 			console.log(`Patching file with ID ${id}:`, file);

// 			// Send the file to the endpoint using its ID
// 			const res = await http.post(`/api/auth/file/${id}`, file);
// 			if (res.status !== 200) {
// 				throw new Error(`Failed to patch file with ID ${id}`);
// 			}
// 		}

// 		return { message: "Files updated successfully" };
// 	} catch (error) {
// 		console.error("Error updating files:", error);
// 		throw error; // Rethrow the error to be caught by the caller
// 	}
// };
