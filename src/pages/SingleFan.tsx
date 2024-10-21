/* eslint-disable react-refresh/only-export-components */
import {
	LoaderFunction,
	redirect,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { getFanById, loggedInData, deleteFanById } from "../utils/api";
import { FanValues } from "../types/FanValues";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import LineSpinner from "../components/LineSpinner";
import defaultAvatar from "../assets/default-avatar.jpg";

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
	return;
};

// SingleFan Component
const SingleFan = () => {
	const { enabled } = useTheme();
	const fan = useLoaderData() as FanValues;
	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [deletingFanName, setDeletingFanName] = useState<string | null>(null);
	const [showOverlay, setShowOverlay] = useState(false);

	if (!fan) {
		return <LineSpinner />;
	}

	const handleDeleteFan = async () => {
		try {
			// stores the name of the fan being deleted to be displayed in the overlay
			setDeletingFanName(`${fan.first_name} ${fan.last_name}`);

			await deleteFanById(fan.id);
			setSuccessMessage("has been successfully");

			setIsModalOpen(false);
			setShowOverlay(true);
			setTimeout(() => {
				setShowOverlay(false);
				navigate("/fans"); // Navigate back to fans list
			}, 2000);
		} catch (error) {
			setSuccessMessage(
				"Failed to delete fan. You may not have the necessary permissions or the fan may not exist."
			);
		}
	};

	return (
		<article className='px-10'>
			<h1 className='mt-4 mb-16 text-xl font-bold text-center lg:mt-16 font-titles'>
				{/* This will be shown on mobile (default) */}
				<span className='block lg:hidden'>
					f.a.n <br /> .d.e.t.a.i.l.s.
				</span>

				{/* This will be shown on larger screens */}
				<span className='hidden lg:inline lg:uppercase'>
					.f.a.n..d.e.t.a.i.l.s.
				</span>
			</h1>

			<div className='flex flex-col gap-2'>
				{fan.avatar && fan.avatar.avatar_path ? (
					<img
						src={
							fan.avatar
								? `https://www.mypearlsofgreatprice.de/storage/${fan.avatar.avatar_path}`
								: defaultAvatar
						}
						alt={`Picture of ${fan.first_name} ${fan.last_name}`}
						className='w-10 h-10 mb-2 rounded'
						onError={(e) => {
							console.error("Failed to load avatar:", e);
						}}
					/>
				) : (
					<p>No avatar available</p>
				)}
				<p>
					<span className='font-semibold'>Fan ID:</span> {fan.id}
				</p>
				<p>
					<span className='font-semibold'>First Name:</span> {fan.first_name}
				</p>
				<p>
					<span className='font-semibold'>Last Name:</span> {fan.last_name}
				</p>
				<p>
					<span className='font-semibold'>Email:</span> {fan.email}
				</p>
				<p>
					<span className='font-semibold'>Relationship to Kid:</span>{" "}
					{fan.relationship_to_kid}
				</p>
			</div>
			<div className='flex flex-col items-end gap-2 mt-20 text-sm'>
				<button
					type='button'
					className='px-2 border border-red-500 rounded-sm shadow-custom-delete dark:border-red-500 dark:text-white'
					onClick={() => {
						setIsModalOpen(true);
					}}>
					D.e.l.e.t.e
				</button>
				<button
					className={`${
						enabled ? "shadow-custom-view-dark" : "shadow-custom-view"
					} px-2 border border-black rounded-sm dark:border-white dark:text-white`}
					type='button'
					onClick={() => navigate("/fans")}>
					B.a.c.k..t.o..L.i.s.t
				</button>
			</div>

			{/* Modal Handlung */}
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

			{successMessage && showOverlay && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='absolute inset-0 bg-black opacity-80'></div>
					<div className='z-10 w-64 p-6 bg-white rounded-[6rem] text-lg font-black text-center relative rounded-tr-lg shadow-lg min-h-96 dark:bg-gray-800'>
						<button
							className='absolute px-2 font-serif text-lg font-black text-white bg-black rounded top-4 right-4 dark:bg-white dark:text-black'
							onClick={() => setIsModalOpen(false)}>
							X
						</button>
						<h2 className='pt-16 mb-8 text-2xl underline'>{deletingFanName}</h2>
						<p className='text-2xl'>
							{successMessage} <br />
							<span className='text-red-600 '>deleted!</span>{" "}
						</p>
						<button
							className={`${
								enabled ? "bg-white text-black" : "bg-black text-white"
							} px-6 mt-16 text-md rounded-md rounded-br-3xl rounded-bl-3xl`}
							type='button'
							onClick={() => navigate("/fans")}>
							Back to List
						</button>
					</div>
				</div>
			)}
		</article>
	);
};

export default SingleFan;
