/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	useSubmit,
	useLocation,
	useActionData,
	redirect,
	ActionFunction,
	LoaderFunction,
} from "react-router-dom";
import http from "../utils/http";
import { MemoryValues } from "../types/MemoryValues";
import { loggedInData, postMemory } from "../utils/api";
import DarkModeBtn from "../partials/DarkModeBtn";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import {
	days,
	kidOptions,
	months,
	useFileUpload,
	years,
} from "../utils/memoryUtils";

const CreateMemory: React.FC = () => {
	// const loaderData = useLoaderData();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<MemoryValues>({
		defaultValues: {
			kid: "",
			title: "",
			description: "",
			month: "",
			category_ids: [],
			files: [],
			urls: "",
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
	const actionData = useActionData() as MemoryValues | Error;
	const [categories, setCategories] = useState<
		{ id: string; category: string }[]
	>([]);

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

	const onValid: SubmitHandler<MemoryValues> = (data, event) => {
		const formData = new FormData(event?.target as HTMLFormElement);
		const categoryIds = getValues("category_ids");

		formData.delete("category_ids");
		if (Array.isArray(categoryIds)) {
			categoryIds.forEach((id) => formData.append("category_ids[]", id));
		} else {
			formData.append("category_ids[]", categoryIds);
		}

		const urlList = data.urls.split(",").map((url) => url.trim());
		const formattedUrls = urlList.map((url, index) => ({
			id: Date.now() + index,
			url_address: url,
		}));

		const payload = {
			...data,
			urls: formattedUrls,
		};

		console.log("Form submitted with payload:", payload);

		submit(formData, {
			method: "POST",
			action: location.pathname,
			encType: "multipart/form-data",
		});
	};

	return (
		<>
			<div className='flex justify-center'>
				<form
					onSubmit={handleSubmit(onValid)}
					className='max-w-[30rem] px-10 flex flex-col'>
					<DarkModeBtn />
					<ScrollUpBtn />
					<h1 className='mt-4 font-bold text-center font-titles'>
						Create a New Memory
					</h1>
					<fieldset className='mt-8'>
						<legend className='text-sm font-semibold leading-6 text-center text-gray-900'>
							for...
						</legend>
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
										className='block ml-3 text-sm font-medium leading-6 text-gray-900'>
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
						<fieldset className='relative flex flex-wrap justify-center w-full p-4 pt-6 border-[2.5px] rounded-[3px] border-black'>
							<legend className='absolute flex px-2 text-sm text-black bg-white -top-3 left-4'>
								Categories
							</legend>
							{categories.map((category) => (
								<label
									key={category.id}
									htmlFor={`category-${category.id}`}
									className={`relative flex px-3 mx-2 my-1 border border-black rounded cursor-pointer w-fit ${
										getValues("category_ids")?.includes(category.id.toString())
											? "bg-white text-black"
											: "bg-black text-white"
									} hover:bg-white hover:text-black`}>
									{category.category}
									<input
										id={`category-${category.id}`}
										className='absolute top-0 left-0 w-full h-full opacity-0'
										type='checkbox'
										value={category.id}
										{...register("category_ids", {
											required: "Please select at least one category.",
										})}
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
						<label className='block mb-2 text-sm font-medium text-gray-900'>
							Title
						</label>
						<input
							{...register("title", { required: true })}
							type='text'
							className='block w-full px-4 py-2 text-sm border rounded-md'
						/>
						{errors.title && (
							<p className='mt-1 text-sm font-light text-orange-500'>
								This field is required.
							</p>
						)}
					</div>
					<div className='mt-10'>
						<label className='block mb-2 text-sm font-medium text-gray-900'>
							Description
						</label>
						<textarea
							{...register("description", { required: true })}
							className='block w-full px-4 py-2 text-sm border rounded-md'
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
							className='block text-sm font-medium text-gray-700'>
							Date
						</label>
						<div className='flex space-x-4'>
							<select
								{...register("month")}
								className='block w-full px-4 py-2 text-sm border rounded-md'>
								{months.map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>
							<select
								{...register("day")}
								className='block w-full px-4 py-2 text-sm border rounded-md'>
								{days.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
							<select
								{...register("year")}
								className='block w-full px-4 py-2 text-sm border rounded-md'>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className='mt-10'>
						<label className='block mb-2 text-sm font-medium text-gray-900'>
							Upload Images
						</label>
						<input
							name='image_paths[]'
							type='file'
							multiple
							accept='image/*'
							onChange={handleFileChange}
							className='block w-full text-sm border rounded-md'
						/>
						{imagePreviews.length > 0 && (
							<div className='grid grid-cols-3 gap-4 mt-2'>
								{imagePreviews.map((preview, index) => (
									<div key={index} className='relative'>
										<img
											src={preview}
											alt={`Image Preview ${index}`}
											className='h-32 mb-2 mr-2'
										/>
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
						<label className='block mb-2 text-sm font-medium text-gray-900'>
							Upload Audio
						</label>
						<input
							name='audio_paths[]'
							type='file'
							multiple
							accept='audio/*'
							onChange={handleFileChange}
							className='block w-full text-sm border rounded-md'
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
						<label className='block mb-2 text-sm font-medium text-gray-900'>
							Upload Video
						</label>
						<input
							name='video_paths[]'
							type='file'
							multiple
							accept='video/*'
							onChange={handleFileChange}
							className='block w-full text-sm border rounded-md'
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
						<label className='block mb-2 text-sm font-medium text-gray-900'>
							URLs
						</label>
						<input
							{...register("urls", {
								validate: (value) =>
									value
										.split(",")
										.every((url) =>
											url.trim().match(/^(https?:\/\/)?([^\s$.?#].[^\s]*)$/)
										) || "One or more URLs are invalid.",
							})}
							type='text'
							placeholder='example.com, another-example.com'
							className='block w-full px-4 py-2 text-sm border rounded-md'
						/>
						{errors.urls && (
							<p className='text-sm font-light text-red-500'>
								{errors.urls.message}
							</p>
						)}
					</div>
					<button
						type='submit'
						className='px-4 py-2 mt-10 text-white bg-black rounded-md'>
						Submit
					</button>
					{actionData && actionData.message && <p>{actionData.message}</p>}
				</form>
			</div>
		</>
	);
};

export default CreateMemory;

// ACTION
export const action: ActionFunction = async ({ request }) => {
	const { loggedIn, isAdmin } = await loggedInData();
	const formData = await request.formData();

	if (!loggedIn) {
		return redirect("/login");
	}
	if (!isAdmin) {
		return "Admin Zone: Access denied";
	}

	try {
		await postMemory(formData);
		return redirect("/memories");
	} catch (error) {
		return error;
	}
};

// LOADER for the form itself
export const loader: LoaderFunction = async () => {
	const { loggedIn, isAdmin } = await loggedInData();

	if (!loggedIn) {
		return redirect("/login");
	}
	if (!isAdmin) {
		return redirect("/login?message=adminZone");
	}

	return null;
};
