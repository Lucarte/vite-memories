import { FanValues } from "../types/FanValues";
import { PatchValues } from "../types/MemoryValues";
import http from "./http";

export const loggedInData = async () => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/api/auth/status`,
		{
			credentials: "include", // Send cookies with the request
		}
	);

	const data = await response.json();
	return {
		loggedIn: data.loggedIn,
		userId: data.userId,
		isAdmin: data.isAdmin,
		firstName: data.firstName,
		isApproved: data.isApproved, // Ensure this is included
	};
};

// REGISTER
export const register = async (formData: FormData) => {
	const res = await http.post("api/auth/register", formData);
	if (res.status !== 201) throw res;
	return res.data;
};

// LOGIN
export const login = async (formData: FormData) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/api/auth/login`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include", // Ensures cookies are sent
			body: JSON.stringify(Object.fromEntries(formData)), // Converts FormData to JSON
		}
	);

	// Parse the response body
	const data = await response.json();

	return { status: response.status, data }; // Return both status and data
};

// LOGOUT
export const logout = async () => {
	const res = await http.post("/api/auth/logout");
	if (res.status !== 200) throw res;
	return res.data;
};

// MEMORIES
export const getAllMemories = async () => {
	const res = await http("/api/auth/memories");
	if (res.status !== 200) throw res;
	return res.data.Memories || [];
};

// GET MEMORY BY TITLE
export const getMemoryByTitle = async (title: string) => {
	const res = await http(`/api/auth/memories/title/${title}`);
	if (res.status !== 200)
		throw new Error(`Memory with title ${title} not found`);
	return res.data;
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
	const res = await http.patch(`/api/auth/memories/${id}`, data);
	if (res.status !== 200) throw res;
	return res.data;
};

// GET PABLOS MEMORIES
export const getPablosMemories = async () => {
	const res = await http(`/api/auth/pablo/memories`);
	if (res.status !== 200) throw new Error(`Memories for Pablo not found`);
	return res.data;
};

// GET GABIS MEMORIES
export const getGabisMemories = async () => {
	const res = await http(`/api/auth/gabriella/memories`);
	if (res.status !== 200) throw new Error(`Memories for Gabriella not found`);
	return res.data;
};

// GET BRUNNIS MEMORIES
export const getBrunnisMemories = async () => {
	const res = await http(`/api/auth/brunnis/memories`);
	if (res.status !== 200) throw new Error(`Memories for Brunnis not found`);
	return res.data;
};

// FANS
export const getAllFans = async () => {
	try {
		const res = await http.get("/api/auth/fans");
		if (res.status !== 200) {
			throw new Error("Failed to fetch fans");
		}
		return res.data.users || [];
	} catch (error) {
		console.error("Error fetching fans:", error);
		return []; // Handle error and return appropriate value
	}
};

// GET FAN BY ID
export const getFanById = async (id: number): Promise<FanValues> => {
	try {
		const response = await http(`/api/auth/fan/${id}`);
		if (response.status !== 200) throw new Error(`Fan with id ${id} not found`);
		return response.data.user;
	} catch (error) {
		console.error("Error fetching fan by ID:", error);
		throw error;
	}
};

// DELETE FAN
export const deleteFanById = async (id: number) => {
	const res = await http.delete(`/api/auth/fan/${id}`);
	if (res.status !== 200) throw res;
	return res.data;
};
