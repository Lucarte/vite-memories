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
		<article className='flex flex-col items-center gap-6'>
			<h1 className='mt-10 mb-6 text-xl font-bold font-titles'>
				F.a.n..D.e.t.a.i.l.s
			</h1>

			<p>
				{fan.first_name} {fan.last_name}
			</p>
			{fan.avatar && fan.avatar.avatar_path ? (
				<img
					src={`http://localhost/storage/${fan.avatar.avatar_path}`}
					alt={`Picture of ${fan.first_name} ${fan.last_name}`}
					className='w-10 h-10 rounded'
					onError={(e) => {
						console.error("Failed to load avatar:", e);
					}}
				/>
			) : (
				<p>No avatar available</p>
			)}
			<p>
				<strong>ID:</strong> {fan.id}
			</p>
			<p>
				<strong>Email:</strong> {fan.email}
			</p>
			<p>
				<strong>Relationship to Kid:</strong> {fan.relationship_to_kid}
			</p>
			<br />
		</article>
	);
};

export default SingleFan;
