/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import HerzSpinner from "../components/HerzSpinner";
import { FanValues } from "../types/FanValues";
import { deleteFanById, getAllFans, loggedInData } from "../utils/api";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import { useTheme } from "../context/ThemeContext";

// Define the type for fans data
interface FansData {
	fans: FanValues[];
	error?: string;
}

// Loader - All Fans
export const loader: LoaderFunction = async () => {
	const { isAdmin } = await loggedInData();

	if (!isAdmin) {
		console.log("Admin Zone: Access denied");
		return { fans: [], error: "Admin Zone" };
	}

	try {
		const fans = await getAllFans();
		return { fans };
	} catch (error) {
		return { error: "Error fetching fans" };
	}
};

// Fans Component
const Fans = () => {
	const { enabled } = useTheme();
	const { fans, error } = useLoaderData() as FansData;
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fanToDelete, setFanToDelete] = useState<number | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [deletingFanName, setDeletingFanName] = useState<string | null>(null);
	const [showOverlay, setShowOverlay] = useState(false);

	// Navigate AFTER having shown the error message
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				navigate("/login");
			}, 2000);

			return () => clearTimeout(timer); // Clear timeout if component unmounts
		}
	}, [error, navigate]);

	// Design an art of simple overlay for the error message
	if (error) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
				<div className='text-center'>
					<h2 className='mb-4 text-2xl font-bold tracking-wider uppercase'>
						{error}
					</h2>
				</div>
			</div>
		);
	}

	// Integrate Spinner
	if (!fans) {
		return (
			<div className='flex justify-center w-screen'>
				<HerzSpinner />
			</div>
		);
	}

	if (fans.length === 0) {
		return <p>No fans found.</p>;
	}

	const handleViewFan = (fanId: number) => {
		navigate(`../fan/${fanId}`);
	};

	const handleDeleteFan = async () => {
		if (fanToDelete !== null) {
			try {
				const fan = fans.find((fan) => fan.id === fanToDelete);
				if (fan) {
					// stores the name of the fan being deleted to be displayed in the overlay
					setDeletingFanName(`${fan.first_name} ${fan.last_name}`);
				}

				await deleteFanById(fanToDelete);
				setSuccessMessage("has been successfully deleted!");
				setFanToDelete(null);
				setIsModalOpen(false);

				setShowOverlay(true);
				setTimeout(() => {
					setShowOverlay(false);
					window.location.reload();
				}, 2000);
			} catch (error) {
				setSuccessMessage(
					"Failed to delete fan. You may not have the necessary permissions or the fan may not exist."
				);
			}
		}
	};

	return (
		<article className='flex flex-col items-center justify-center lg:mt-20'>
			<ScrollUpBtn />
			<h1 className='pt-8 pb-12 text-xl font-medium tracking-widest text-center'>
				List of Fans
			</h1>

			{successMessage && showOverlay && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
					<div className='text-center'>
						<h2 className='mb-4 text-xl font-thin'>{deletingFanName}</h2>
						<p className='text-lg font-thin'>{successMessage}</p>
					</div>
				</div>
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

			{isModalOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-black opacity-80'></div>
					<div className='z-10 w-64 p-6 bg-white rounded-[6rem] relative rounded-tr-lg shadow-lg min-h-96 dark:bg-gray-800'>
						<button
							className='absolute px-2 font-serif text-lg font-black text-white bg-black rounded top-4 right-4 dark:bg-white dark:text-black'
							onClick={() => setIsModalOpen(false)}>
							X
						</button>
						<h2 className='pt-16 mb-12 text-2xl font-black text-center'>
							Are you sure you want to delete this fan?
						</h2>
						<div className='flex flex-col w-full gap-4 text-sm'>
							<div className='flex justify-end w-full'>
								<button
									className='py-1 pl-3 pr-8 text-white bg-red-600 rounded-md rounded-br-3xl w-fit'
									onClick={handleDeleteFan}>
									Yes, delete!
								</button>
							</div>
							<div className='flex justify-start w-full'>
								<button
									className='py-1 pl-8 pr-3 text-white bg-black rounded-md rounded-bl-3xl w-fit'
									onClick={() => setIsModalOpen(false)}>
									Not sure, cancel!
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</article>
	);
};

export default Fans;
