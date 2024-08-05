/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	useSubmit,
	useLocation,
	useActionData,
	useLoaderData,
	useNavigate,
	ActionFunctionArgs,
} from "react-router-dom";
import http from "../utils/http";
import { MemoryValues } from "../types/MemoryValues";
import { loggedInData, postMemory } from "../utils/api";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import {
	days,
	kidOptions,
	months,
	useFileUpload,
	years,
} from "../utils/memoryUtils";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../context/ThemeContext";

type CreateMemoryData = {
	error?: string;
};

const CreateMemory = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<MemoryValues>({
		defaultValues: {
			kid: "",
			title: "",
			description: "",
			month: "",
			category_ids: [],
			files: [],
		},
	});

	const {
		handleFileChange,
		handleRemoveFile,
		imagePreviews,
		audioPreviews,
		videoPreviews,
		fileErrors,
	} = useFileUpload();
	const submit = useSubmit();
	const location = useLocation();
	const navigate = useNavigate();
	const actionData = useActionData() as {
		message: string;
		redirectTo?: string;
	};
	const loaderData = useLoaderData() as CreateMemoryData;
	const error = loaderData?.error;
	const [showOverlay, setShowOverlay] = useState(false);
	const [categories, setCategories] = useState<
		{ id: string; category: string }[]
	>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const { enabled } = useTheme();

	useEffect(() => {
		if (error) {
			setShowOverlay(true);
			const timer = setTimeout(() => {
				navigate("/login");
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [error, navigate]);

	useEffect(() => {
		if (actionData?.redirectTo) {
			const timer = setTimeout(() => {
				window.location.href = actionData.redirectTo || "/";
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [actionData]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await http.get("/api/auth/categories");
				setCategories(response.data);
			} catch (error) {
				console.error("Failed to fetch categories", error);
			}
		};

		fetchCategories();
	}, []);

	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategories((prev) => {
			// Determine if the category is already selected
			const isSelected = prev.includes(categoryId);

			// Toggle the category
			const updatedCategories = isSelected
				? prev.filter((id) => id !== categoryId) // Deselect
				: [...prev, categoryId]; // Select

			// Update form values
			setValue("category_ids", updatedCategories);

			return updatedCategories;
		});
	};

	const onValid: SubmitHandler<MemoryValues> = (data, event) => {
		const formData = new FormData(event?.target as HTMLFormElement);
		const categoryIds = getValues("category_ids");

		formData.delete("category_ids");
		if (Array.isArray(categoryIds)) {
			categoryIds.forEach((id) => formData.append("category_ids[]", id));
		} else {
			formData.append("category_ids[]", categoryIds);
		}

		const urlList = Array.isArray(data.urls) ? data.urls : [];
		const formattedUrls = urlList.map((url) => ({
			id: url.url_address,
			url_address: url.url_address,
		}));

		submit(formData, {
			method: "POST",
			action: location.pathname,
			encType: "multipart/form-data",
		});
	};

	return (
		<>
			{showOverlay && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 dark:bg-white dark:bg-opacity-70'>
					<div className='z-10 2xl:w-72 w-64 px-6 py-10 flex flex-col items-center justify-center bg-white rounded-[5rem] rounded-tr-lg shadow-lg h-auto dark:bg-black'>
						<h2 className='text-2xl font-black leading-10 text-center text-black uppercase dark:text-white'>
							{error}
						</h2>
					</div>
				</div>
			)}
			{actionData?.message && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 dark:bg-white dark:bg-opacity-70'>
					<div className='z-10 2xl:w-72 w-64 px-6 py-10 flex flex-col items-center justify-center bg-white rounded-[5rem] rounded-tr-lg shadow-lg h-auto dark:bg-black'>
						<h2 className='text-2xl font-black leading-10 text-center text-black uppercase dark:text-white'>
							{actionData.message}
						</h2>
					</div>
				</div>
			)}
			<div className='flex justify-center'>
				<form
					onSubmit={handleSubmit(onValid)}
					className='max-w-[30rem] px-10 flex flex-col'>
					<ScrollUpBtn />
					<h1 className='mt-4 font-bold text-center font-titles'>
						Create a New Memory
					</h1>
					<fieldset className='mt-8'>
						<legend className='sr-only'>for...</legend>
						<div className='mt-3 space-y-3'>
							{kidOptions.map((option) => (
								<div key={option.id} className='flex items-center'>
									<input
										id={option.id}
										{...register("kid", { required: true })}
										type='radio'
										name='kid'
										value={option.name}
										className='w-4 h-4 text-black border-gray-300 focus:ring-orange-600'
									/>
									<label
										htmlFor={option.id}
										className='ml-3 text-sm font-medium leading-6 text-gray-900 '>
										{option.name}
									</label>
								</div>
							))}
						</div>
						{errors.kid && (
							<p className='text-sm font-light text-orange-500 '>
								Please select one option.
							</p>
						)}
					</fieldset>
					<article className='mt-10 font-light'>
						<h2 className='mb-1 font-semibold text-black dark:text-white'>
							Categories
						</h2>
						<fieldset className='flex flex-wrap justify-center w-full p-4 pt-6 border-[2.5px] rounded-[3px] dark:border-white border-black'>
							<legend className='sr-only'>Categories</legend>
							{/* Visible <p> element for styling */}
							{categories.map((category) => (
								<label
									key={category.id}
									htmlFor={`category-${category.id}`}
									className={`relative flex px-3 mx-2 my-1 border text-black border-black dark:border-white dark:text-black rounded w-fit ${
										selectedCategories.includes(category.id)
											? "bg-black text-white dark:bg-white dark:text-black" // Active styles
											: "border-black bg-white text-black dark:border-white dark:text-white dark:bg-black" // Inactive styles
									} hover:text-gray-500 dark:hover:text-gray-500`}>
									{category.category}
									<input
										id={`category-${category.id}`}
										className='absolute inset-0 opacity-0 cursor-pointer'
										type='checkbox'
										value={category.id}
										onChange={() => handleCategoryChange(category.id)}
										checked={selectedCategories.includes(category.id)}
									/>
								</label>
							))}
							{errors.category_ids && (
								<p className='mt-1 text-sm font-light text-orange-500'>
									{errors.category_ids.message}
								</p>
							)}
						</fieldset>
					</article>
					<div className='mt-10'>
						<label className='text-sm font-semibold text-gray-900 '>
							Title
						</label>
						<input
							{...register("title", { required: true })}
							type='text'
							className='w-full px-4 py-2 text-sm border-2 border-black rounded-md '
						/>
						{errors.title && (
							<p className='mt-1 text-sm font-light text-orange-500'>
								This field is required.
							</p>
						)}
					</div>
					<div className='mt-10'>
						<label className='mb-2 text-sm font-semibold text-gray-900 '>
							Description
						</label>
						<textarea
							{...register("description", { required: true })}
							className='w-full px-4 py-2 text-sm border-2 border-black rounded-md dark:border-white dark:bg-black dark:text-white'
							rows={4}
						/>
						{errors.description && (
							<p className='mt-1 text-sm font-light text-orange-500'>
								This field is required.
							</p>
						)}
					</div>
					<div className='mt-10'>
						<label
							htmlFor='date'
							className='text-sm font-semibold text-gray-700 '>
							Date
						</label>
						<div className='flex space-x-4'>
							<select
								{...register("month")}
								className='w-full px-4 py-2 text-sm border-2 border-black rounded-md dark:border-white dark:bg-black dark:text-white'>
								{months.map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>
							<select
								{...register("day")}
								className='w-full px-4 py-2 text-sm border-2 border-black rounded-md dark:border-white dark:bg-black dark:text-white'>
								{days.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
							<select
								{...register("year")}
								className='w-full px-4 py-2 text-sm border-2 border-black rounded-md dark:border-white dark:bg-black dark:text-white'>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className='mt-10'>
						<label className='mb-2 text-sm font-medium text-gray-900 '>
							Upload Images
						</label>
						<input
							name='image_paths[]'
							type='file'
							multiple
							accept='image/*'
							onChange={handleFileChange}
							className='w-full text-sm border rounded-md '
						/>
						{imagePreviews.length > 0 && (
							<div className='grid grid-cols-3 gap-4 mt-2'>
								{imagePreviews.map((preview, index) => (
									<div key={index} className='relative'>
										<img src={preview} alt={`preview-${index}`} />
										<button
											type='button'
											onClick={() => handleRemoveFile("image", index)}
											className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full'>
											X
										</button>
									</div>
								))}
							</div>
						)}
						{fileErrors.length > 0 && (
							<div className='mt-2'>
								{fileErrors.map((error, index) => (
									<p key={index} className='text-sm font-light text-orange-500'>
										{error}
									</p>
								))}
							</div>
						)}
					</div>
					<div className='mt-10'>
						<label className='mb-2 text-sm font-medium text-gray-900 '>
							Upload Audio
						</label>
						<input
							name='audio_paths[]'
							type='file'
							multiple
							accept='audio/*'
							onChange={handleFileChange}
							className='w-full text-sm border rounded-md '
						/>
						{audioPreviews.length > 0 && (
							<div className='mt-2'>
								{audioPreviews.map((preview, index) => (
									<div key={index} className='relative'>
										<audio controls className='w-full mt-2'>
											<source src={preview} type='audio/mpeg' />
											Your browser does not support the audio element.
										</audio>
										<button
											type='button'
											onClick={() => handleRemoveFile("audio", index)}
											className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full'>
											X
										</button>
									</div>
								))}
							</div>
						)}
						{fileErrors.length > 0 && (
							<div className='mt-2'>
								{fileErrors.map((error, index) => (
									<p key={index} className='text-sm font-light text-orange-500'>
										{error}
									</p>
								))}
							</div>
						)}
					</div>
					<div className='mt-10'>
						<label className='mb-2 text-sm font-medium text-gray-900 '>
							Upload Video
						</label>
						<input
							name='video_paths[]'
							type='file'
							multiple
							accept='video/*'
							onChange={handleFileChange}
							className='w-full text-sm border rounded-md '
						/>
						{videoPreviews.length > 0 && (
							<div className='mt-2'>
								{videoPreviews.map((preview, index) => (
									<div key={index} className='relative'>
										<video controls className='w-full mt-2'>
											<source src={preview} type='video/mp4' />
											Your browser does not support the video tag.
										</video>
										<button
											type='button'
											onClick={() => handleRemoveFile("video", index)}
											className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full'>
											X
										</button>
									</div>
								))}
							</div>
						)}
						{fileErrors.length > 0 && (
							<div className='mt-2'>
								{fileErrors.map((error, index) => (
									<p key={index} className='text-sm font-light text-orange-500'>
										{error}
									</p>
								))}
							</div>
						)}
					</div>
					<div className='mt-10'>
						<label className='mb-2 text-sm font-medium text-gray-900 '>
							URLs
						</label>
						<input
							{...register("urls")}
							type='text'
							placeholder='example.com, another-example.com'
							className='w-full px-4 py-2 text-sm border rounded-md '
						/>
						{errors.urls && (
							<p className='text-sm font-light text-red-500'>
								{errors.urls.message}
							</p>
						)}
					</div>
					<CustomButton
						type='submit'
						classes={`px-4 uppercase mt-12 text-md py-2 mx-auto rounded-tr-none mb-36 w-fit rounded-bl-none rounded-2xl font-medium leading-6 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
							enabled
								? "border-3 border-white text-white shadow-custom-view-dark-lg text-black bg-black hover:text-gray-700 hover:bg-gray-50"
								: "text-black border-3 border-black hover:bg-gray-100 active:bg-gray-100 active:text-black hover:text-gray-700 shadow-custom-view-lg bg-white"
						}`}
						text='Create Memory'
					/>
				</form>
			</div>
		</>
	);
};

export default CreateMemory;

// ACTION
export const action = async ({ request }: ActionFunctionArgs) => {
	const { isAdmin } = await loggedInData();
	const formData = await request.formData();

	if (!isAdmin) {
		return { message: "Admin Zone: Access denied" };
	}

	try {
		await postMemory(formData);
		return { message: "Memory created successfully", redirectTo: "/memories" };
	} catch (error) {
		return { message: "Failed to create memory" };
	}
};

// LOADER for the form itself
export const loader = async () => {
	const { isAdmin } = await loggedInData();

	if (!isAdmin) {
		return { error: "Admin Zone: Access denied" };
	}

	return null;
};
