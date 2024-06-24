import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import http from "../utils/http";
import { useEffect, useState } from "react";
import LightAndUpBtns from "../partials/LightAndUpBtns";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

type KidOptionProps = {
	id: string;
	name: string;
};

const kidOptions: KidOptionProps[] = [
	{ id: "both", name: "Both" },
	{ id: "pablo", name: "Pablo" },
	{ id: "gabriella", name: "Gabriella" },
];

type MemoryFormValues = {
	kid: string;
	title: string;
	description: string;
	year: number | string;
	month?: string;
	day?: number | string;
	image?: File[];
	audio?: File[];
	video?: File[];
	file_paths: File[];
	urls?: string[];
	category_ids: string[];
};

const years: number[] = Array.from({ length: 101 }, (_, i) => 2000 + i);

const months: string[] = [
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

const days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

const MemoryForm: React.FC = () => {
	const { auth } = useContext(AuthContext);
	auth.isAdmin ?? "false";
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<MemoryFormValues>({
		defaultValues: {
			kid: "",
			category_ids: [],
			title: "",
			description: "",
			year: "",
			month: "",
			day: "",
		},
	});

	const [categories, setCategories] = useState<
		{ id: string; category: string }[]
	>([]);
	const [uploadedFile, setUploadedFile] = useState<string | null>(null);
	const [mediaType, setMediaType] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const validImageTypes = [
				"image/jpeg",
				"image/jpg",
				"image/png",
				"image/gif",
				"image/svg+xml",
			];
			const validAudioTypes = [
				"audio/x-aiff",
				"audio/mpeg",
				"audio/m4a",
				"audio/mp3",
			];
			const validVideoTypes = [
				"video/mp4",
				"video/avi",
				"video/quicktime",
				"video/mpeg",
			];

			if (validImageTypes.includes(file.type)) {
				setUploadedFile(URL.createObjectURL(file));
				setMediaType("image");
			} else if (validAudioTypes.includes(file.type)) {
				setUploadedFile(null);
				setMediaType("audio");
			} else if (validVideoTypes.includes(file.type)) {
				setUploadedFile(null);
				setMediaType("video");
			} else {
				alert("Invalid file type.");
				return;
			}

			if (file.size > 222048 * 1024) {
				// 2 MB for images
				alert("File size exceeds 2 MB.");
				return;
			}
			// Additional size validation for other file types can be added here
		} else {
			setUploadedFile(null);
			setMediaType(null);
		}
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await http.get("/categories");
				setCategories(response.data);
			} catch (error) {
				console.error("Failed to fetch categories", error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		return () => {
			if (uploadedFile) {
				URL.revokeObjectURL(uploadedFile);
			}
		};
	}, [uploadedFile]);

	const onSubmit: SubmitHandler<MemoryFormValues> = async (data) => {
		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");

			const formData = new FormData();
			formData.append("kid", data.kid);
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("year", String(data.year));
			formData.append("month", data.month || "");
			formData.append("day", String(data.day || ""));
			formData.append("category_ids", JSON.stringify(data.category_ids));

			if (data.file_paths) {
				Array.from(data.file_paths).forEach((file: File, index: number) => {
					formData.append(`file_paths[${index}]`, file);
				});
			}

			if (data.urls) {
				data.urls.forEach((url: string, index: number) => {
					formData.append(`urls[${index}]`, url);
				});
			}

			const response = await http.post("/memory", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(response.data);
		} catch (error) {
			console.error("There was an error creating the memory:", error);
		}
	};
	// console.log(getValues("category_ids"));
	const selectedCategories = getValues("category_ids");
	return (
		<div className='flex justify-center'>
			<form onSubmit={handleSubmit(onSubmit)} className='max-w-[30rem]'>
				<LightAndUpBtns />
				<h1 className='mt-16 font-bold font-titles'>Create a New Memory</h1>

				{/* Radio Input Field = Kid Options */}
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

				{/* Memory Categories */}

				<article className='mt-10 font-light'>
					<fieldset className='relative flex flex-wrap justify-center w-full p-4 pt-6 border-[2.5px] rounded-[3px] border-black'>
						<legend className='absolute flex px-2 text-sm text-black bg-white -top-3 left-4'>
							Categories
						</legend>
						{categories.map((category) => (
							<label
								key={category.id}
								htmlFor={`category-${category.id}`}
								className={`relative flex px-3 mx-2 my-1 border border-black rounded cursor-pointer w-fit  ${
									selectedCategories.includes(category.id.toString())
										? "bg-white text-black"
										: "bg-black text-white"
								} hover:bg-white hover:text-black`}>
								{category.category}
								<input
									id={`category-${category}`}
									className='absolute top-0 left-0 w-full h-full opacity-0'
									type='checkbox'
									value={category.id}
									{...register("category_ids", {
										required: "Please select at least one category.",
									})}
								/>
							</label>
						))}
						{errors.category_ids && <p>{errors.category_ids.message}</p>}
					</fieldset>
					{errors.category_ids && (
						<p className='mt-1 text-sm text-orange-500'>
							{errors.category_ids.message}
						</p>
					)}
				</article>

				{/* Title */}
				<div className='relative mt-10'>
					<label
						htmlFor='title'
						className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						Title
					</label>
					<input
						id='title'
						type='text'
						className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
						placeholder='Title'
						aria-invalid={errors.title ? "true" : "false"}
						{...register("title", {
							required: {
								value: true,
								message: "Field required.",
							},
							maxLength: {
								value: 255,
								message: "Maximum length is 255 characters.",
							},
						})}
					/>
					<p className='mt-1 text-sm font-light text-orange-500'>
						{errors.title?.message}
					</p>
				</div>

				{/* Description */}
				<div className='relative mt-10'>
					<label
						htmlFor='description'
						className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						Description
					</label>
					<textarea
						id='description'
						className='block w-full h-64 rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
						placeholder='What do you remember?'
						aria-invalid={errors.description ? "true" : "false"}
						{...register("description", {
							required: {
								value: true,
								message: "Field required.",
							},
							maxLength: {
								value: 2000,
								message: "Maximum length is 2000 characters.",
							},
						})}></textarea>
					<p className='mt-1 text-sm font-light text-orange-500'>
						{errors.description?.message}
					</p>
				</div>

				{/* Media Inputs */}
				<div className='relative mt-10'>
					<p className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						Media Files
					</p>
					<div className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'>
						<div className='mt-5 mb-3 space-y-4'>
							<div className='flex flex-col items-center gap-y-4'>
								{uploadedFile ? (
									<img
										src={uploadedFile}
										alt='Memory File'
										className='object-cover w-12 h-12 rounded-full'
									/>
								) : (
									<UserCircleIcon
										className='w-12 h-12 text-gray-300'
										aria-hidden='true'
									/>
								)}
								<div className='relative px-2 py-1 text-xs text-gray-500 bg-gray-300 rounded-lg'>
									<input
										className='block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
										id='file_paths'
										type='file'
										accept='image/*,audio/*,video/*'
										multiple
										{...register("file_paths", {
											onChange: handleFileChange,
										})}
									/>
								</div>
							</div>
							{/* Add URL  */}
						</div>
					</div>
				</div>

				{/* Date of Memory */}
				<div className='relative mt-10'>
					<label
						htmlFor='date'
						className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						Date of Memory
					</label>

					<div className='flex flex-col gap-2 pb-6 pt-10 w-full h-auto rounded-[3px] border-0 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'>
						<select
							id='date'
							className='block w-full rounded-[3px] font-light border-0 py-2 px-6 bg-gray-100 text-gray-500 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							{...register("year", { required: "Please select a year." })}>
							<option value='' disabled>
								Estimate Year
							</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
						<p className='mt-1 text-sm font-light text-orange-500'>
							{errors.year?.message}
						</p>

						<select
							className='block w-full rounded-[3px] font-light border-0 py-2 px-6 bg-gray-100 text-gray-500 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							{...register("month")}>
							<option value='' disabled>
								Estimate Month
							</option>
							{months.map((month) => (
								<option key={month} value={month}>
									{month}
								</option>
							))}
						</select>
						<p className='mt-1 text-sm text-orange-500'>
							{errors.month?.message}
						</p>

						<select
							className='block w-full rounded-[3px] font-light border-0 py-2 px-6 bg-gray-100 text-gray-500 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							{...register("day")}>
							<option value='' disabled>
								Estimate Day
							</option>
							{days.map((day) => (
								<option key={day} value={day}>
									{day}
								</option>
							))}
						</select>
						<p className='mt-1 text-sm font-light text-orange-500'>
							{errors.day?.message}
						</p>
					</div>
				</div>

				{/* Submit "Button" */}
				<input
					className='cursor-pointer mt-12 h-12 text-md font-normal rounded-bl-2xl rounded-tr-2xl bg-black px-6 py-1.5 leading-6 text-white shadow-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
					type='submit'
					value='Create New Memory'
				/>
			</form>
			<DevTool control={control} />
		</div>
	);
};

export default MemoryForm;
