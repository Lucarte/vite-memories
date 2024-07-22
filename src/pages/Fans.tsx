/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import {
	LoaderFunction,
	useLoaderData,
	redirect,
	useNavigate,
} from "react-router-dom";
import HerzSpinner from "../components/HerzSpinner";
import { FanValues } from "../types/FanValues";
import { deleteFanById, getAllFans, loggedInData } from "../utils/api";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import DarkModeBtn from "../partials/DarkModeBtn";
import { useTheme } from "../context/ThemeContext";

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
	const { enabled } = useTheme();
	const { fans } = useLoaderData() as FansData;
	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
	const [fanToDelete, setFanToDelete] = useState<number | null>(null); // State for fan to delete
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [deletingFanName, setDeletingFanName] = useState<string | null>(null);
	const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility

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

	const handleViewFan = (fanId: number) => {
		navigate(`../fan/${fanId}`);
	};

	const handleDeleteFan = async () => {
		if (fanToDelete !== null) {
			try {
				// TEST Get the name of the fan to delete
				const fan = fans.find((fan) => fan.id === fanToDelete);
				if (fan) {
					setDeletingFanName(`${fan.first_name} ${fan.last_name}`);
				}

				await deleteFanById(fanToDelete);
				setSuccessMessage("Fan has been successfully deleted!");
				setFanToDelete(null);
				setIsModalOpen(false);
				// // Delay before refreshing the page or fetching data
				// setTimeout(() => {
				// 	window.location.reload(); // Reload the page to reflect the changes
				// }, 2000);

				// TEST - Show overlay with delay
				setShowOverlay(true);
				setTimeout(() => {
					setShowOverlay(false);
					window.location.reload(); // Reload the page to reflect the changes
				}, 2000);
			} catch (error) {
				console.error("Failed to delete fan:", error);
				setError(
					"Failed to delete fan. You may not have the necessary permissions or the fan may not exist."
				);
			}
		}
	};

	return (
		<article className='flex flex-col items-center justify-center'>
			<ScrollUpBtn />
			<DarkModeBtn />
			<h1 className='pt-8 pb-12 text-xl font-medium tracking-widest text-center'>
				{/* L.i.s.t..o.f..F.a.n.s */}
				List of Fans
			</h1>

			{/* Display Success Message
			{successMessage && (
				<div className='p-4 mb-4 text-white bg-green-500 rounded'>
					{successMessage}
				</div>
			)} */}
			{/* Display Success Message */}
			{successMessage && showOverlay && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
					<div className='text-center'>
						<h2 className='mb-4 text-xl font-thin'>{deletingFanName}</h2>
						<p className='text-lg font-thin'>{successMessage}</p>
					</div>
				</div>
			)}

			{/* Display Error Message */}
			{error && (
				<div className='p-4 mb-4 text-white bg-red-500 rounded'>{error}</div>
			)}

			<ol className='flex flex-col gap-2 w-72'>
				{fans.map((fan) => (
					<li key={fan.id} className='flex justify-between w-full'>
						<div>
							{fan.first_name} {fan.last_name}
						</div>
						<div className='flex gap-5 text-sm'>
							<button
								className={`${
									enabled ? "shadow-custom-view-dark" : "shadow-custom-view"
								} px-2 border border-black rounded-sm dark:border-white dark:text-white`}
								type='button'
								onClick={() => handleViewFan(fan.id)}>
								View
							</button>
							<button
								type='button'
								className='px-2 border border-red-500 rounded-sm shadow-custom-delete dark:border-red-500 dark:text-white'
								onClick={() => {
									setFanToDelete(fan.id);
									setIsModalOpen(true);
								}}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ol>

			{/* Modal to delete user */}
			{isModalOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-black opacity-50'></div>
					<div className='z-10 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800'>
						<h2 className='mb-4 text-lg'>
							Are you sure you want to delete this fan?
						</h2>
						<div className='flex justify-end'>
							<button
								className='px-4 py-2 mr-2 text-white bg-red-500 rounded'
								onClick={handleDeleteFan}>
								Please Delete
							</button>
							<button
								className='px-4 py-2 bg-gray-300 rounded'
								onClick={() => setIsModalOpen(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</article>
	);
};

export default Fans;
