/* eslint-disable react-refresh/only-export-components */
import {
	LoaderFunction,
	Params,
	redirect,
	useLoaderData,
} from "react-router-dom";
import { getFanById, loggedInData } from "../utils/api";
import { FanValues } from "../types/FanValues";

// Define the type for the loader parameters
interface LoaderParams {
	params: Params<string>;
}

export const loader: LoaderFunction = async ({ params }) => {
	const { loggedIn, isAdmin, user } = await loggedInData();

	if (!loggedIn) {
		return redirect("/login");
	}

	const userId = parseInt(params.id as string, 10);
	if (isNaN(userId)) {
		throw new Response("Invalid fan id", { status: 400 });
	}

	// Check if the user is allowed to access the profile
	if (isAdmin || (user && user.id === userId)) {
		try {
			const fan = await getFanById(userId);
			return fan;
		} catch (error) {
			console.error(`Failed to fetch fan: ${error}`);
			throw new Response("Fan not found", { status: 404 });
		}
	}

	console.log("Access denied");
	return redirect("/login");
};

// SingleFan Component
const SingleFan: React.FC = () => {
	const fan = useLoaderData() as FanValues;

	if (!fan) {
		return <div>Loading...</div>;
	}

	return (
		<article>
			<h1>Fan Details</h1>
			<p>
				<strong>ID:</strong> {fan.id}
			</p>
			<p>
				<strong>Name:</strong> {fan.first_name} {fan.last_name}
			</p>
			<p>
				<strong>Email:</strong> {fan.email}
			</p>
			<p>
				<strong>Relationship to Kid:</strong> {fan.relationship_to_kid}
			</p>
			{/* Add more details as needed */}
		</article>
	);
};

export default SingleFan;
