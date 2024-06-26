import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState, useContext } from "react";
import {
	useSubmit,
	useLocation,
	useActionData,
	Link,
	ActionFunction,
} from "react-router-dom";
import http from "../utils/http";
import LightAndUpBtns from "../partials/LightAndUpBtns";
import { AuthContext } from "../context/AuthProvider";
import { MemoryValues } from "../types/MemoryValues";
import { postMemory } from "../utils/api";
import axios from "axios";

const kidOptions = [
	{ id: "both", name: "Both" },
	{ id: "pablo", name: "Pablo" },
	{ id: "gabriella", name: "Gabriella" },
];

// Date Constants
const years = Array.from({ length: 101 }, (_, i) => 2000 + i);
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

// Component
const CreateMemory: React.FC = () => {
	const { auth } = useContext(AuthContext);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<MemoryValues>({
		defaultValues: {
			kid: "",
			title: "",
			description: "",
			month: "",
			day: 1,
			year: new Date().getFullYear(),
			category_ids: [],
			files: [],
		},
	});
	const submit = useSubmit();
	const location = useLocation();
	const actionData = useActionData() as MemoryValues | Error;

	const [categories, setCategories] = useState<
		{ id: string; category: string }[]
	>([]);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);

	// Handle File Types & Upload
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files) {
			const validImageExtensions = ["jpeg", "jpg", "png", "gif", "svg"];
			const validAudioExtensions = ["aiff", "mpeg", "m4a", "mp3"];
			const validVideoExtensions = ["mp4", "avi", "quicktime", "mpeg"];

			const validFiles: File[] = [];
			const validPreviews: string[] = [];

			for (const file of files) {
				const fileExtension = file.name.split(".").pop()?.toLowerCase();
				if (!fileExtension) {
					alert("Unable to determine file extension.");
					continue;
				}

				let valid = false;
				let maxSize = 0;

				if (validImageExtensions.includes(fileExtension)) {
					valid = true;
					maxSize = 3 * 1024 * 1024; // 3MB for images
				} else if (validAudioExtensions.includes(fileExtension)) {
					valid = true;
					maxSize = 20 * 1024 * 1024; // 20MB for audio
				} else if (validVideoExtensions.includes(fileExtension)) {
					valid = true;
					maxSize = 200 * 1024 * 1024; // 200MB for video
				}

				if (valid && file.size <= maxSize) {
					validFiles.push(file);
					validPreviews.push(URL.createObjectURL(file));
				} else {
					alert(`Invalid file: ${file.name}`);
				}
			}

			setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
			setPreviews((prevPreviews) => [...prevPreviews, ...validPreviews]);
		}
	};

	// Fetch Categories
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

	// Custom Validation
	const onValid: SubmitHandler<MemoryValues> = (_, event) => {
		const formData = new FormData(event?.target);
		const categoryIds = getValues("category_ids");

		formData.delete("category_ids");
		if (Array.isArray(categoryIds)) {
			categoryIds.forEach((id) => formData.append("category_ids[]", id));
		} else {
			formData.append("category_ids[]", categoryIds);
		}

		submit(formData, {
			method: "POST",
			action: location.pathname,
			encType: "multipart/form-data",
		});
	};

	return auth.isAdmin !== true ? (
		<div className='flex justify-center'>
			<form
				onSubmit={handleSubmit(onValid)}
				className='max-w-[30rem] px-10 flex flex-col'>
				{/* Buttons for DarkTheme and goHome */}
				<LightAndUpBtns />

				{/* Title */}
				<h1 className='mt-16 font-bold text-center font-titles'>
					Create a New Memory
				</h1>

				{/* Memory belongs to... */}
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

				{/* Categories  */}
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

				{/* Title */}
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

				{/* Description */}
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

				{/* Memory Date */}
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

				{/* File Upload */}
				<div className='mt-10'>
					<label className='block mb-2 text-sm font-medium text-gray-900'>
						Upload Files
					</label>
					<input
						name='file_paths[]'
						type='file'
						multiple
						accept='image/*,audio/*,video/*'
						onChange={handleFileChange}
						className='block w-full text-sm border rounded-md'
					/>
				</div>

				{/* File Previews */}
				<div className='mt-10'>
					{previews.map((preview, index) => (
						<div key={index} className='mb-4'>
							{uploadedFiles[index].type.startsWith("image/") ? (
								<img
									src={preview}
									alt={`Preview ${index + 1}`}
									className='h-auto max-w-full'
								/>
							) : uploadedFiles[index].type.startsWith("video/") ? (
								<video controls className='h-auto max-w-full'>
									<source src={preview} />
								</video>
							) : (
								<p>Preview not available</p>
							)}
						</div>
					))}
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='px-4 py-2 mt-10 text-white bg-black rounded-md'>
					Submit
				</button>
				{actionData && actionData.message ? (
					<p>{actionData.message}</p>
				) : (
					<p></p>
				)}
			</form>
			<DevTool control={control} /> {/* DevTool for debugging */}
		</div>
	) : (
		<>
			<Link to={"/login"} />
			<p>Admin Zone</p>
		</>
	);
};

export default CreateMemory;

// ACTION:
export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	console.log(formData);
	// because of async & await to catch the errors
	try {
		// Request CSRF token
		await http("/sanctum/csrf-cookie");

		const res = await postMemory(formData);

		return res;
	} catch (error) {
		// Type guard for AxiosError
		if (axios.isAxiosError(error)) {
			if (error.response && error.response.status === 400) {
				// action data returned here
				const actionData = error.response.data;
				return actionData;
			}
			// Error Element received here
			throw error;
		}
	}
};
