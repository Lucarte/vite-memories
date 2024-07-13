import { LoaderFunction, redirect, defer } from "react-router-dom";
import { getMemoriesByKid, loggedInData } from "../utils/api";

export const memoryLoader: LoaderFunction = async ({ params }) => {
	// Check if logged in
	const { loggedIn } = await loggedInData();
	if (!loggedIn) {
		return redirect("/login");
	}

	const { kid } = params;
	if (!kid) {
		console.error("No kid parameter provided.");
		return defer({ memories: [] });
	}

	try {
		const response = await getMemoriesByKid(kid);
		const memories = response.Memories;
		return defer({ memories });
	} catch (error) {
		console.error(`Error fetching memories for kid ${kid}:`, error);
		return defer({ memories: [] }); // Return empty array or handle error
	}
};
