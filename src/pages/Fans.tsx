/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { LoaderFunction, useLoaderData, redirect } from "react-router-dom";
import HerzSpinner from "../components/HerzSpinner";
import { FanValues } from "../types/FanValues";
import { getAllFans, loggedInData } from "../utils/api";

// Define the type for fans data
interface FansData {
	fans: FanValues[];
}

// Loader - All Fans
export const loader: LoaderFunction = async () => {
	const { loggedIn, isAdmin } = await loggedInData();

	if (!loggedIn) {
		return redirect("/login");
	}

	if (!isAdmin) {
		console.log("Admin Zone: Access denied");
		return redirect("/login");
	}

	try {
		const fans = await getAllFans();
		console.log("Fetched fans:", fans); // Log fetched data for debugging
		return { fans } as FansData;
	} catch (error) {
		console.error("Error fetching all fans:", error);
		return { fans: [] } as FansData; // Return empty array or handle error
	}
};

// Fans Component
const Fans: React.FC = () => {
	const { fans } = useLoaderData() as FansData;

	if (!fans) {
		// Handle the case where data is still loading
		return (
			<div className='flex justify-center w-screen'>
				<HerzSpinner />
			</div>
		);
	}

	if (fans.length === 0) {
		// Handle the case where there are no fans to display
		return <p>No fans found.</p>;
	}

	return (
		<article>
			<h1>List of Fans</h1>
			<ul>
				{fans.map((fan) => (
					<li key={fan.id}>
						<strong>Name:</strong> {fan.first_name} {fan.last_name}
						<br />
						<strong>Email:</strong> {fan.email}
						<br />
						<strong>Relationship to Kid:</strong> {fan.relationship_to_kid}
						<br />
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
					</li>
				))}
			</ul>
		</article>
	);
};

export default Fans;
