import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import http from "../utils/http";
import { useEffect, useState } from "react";
import LightAndUpBtns from "../components/LightAndUpBtns";

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
	// filePaths: File[];
	// fileTypes: ("image" | "video" | "audio" | "url")[];
	url?: string[];
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

const categories = [
	"Music",
	"Sports",
	"Dance",
	"Viola",
	"Musical Theater",
	"Programming",
	"Art",
	"Various",
	"Climbing",
	"Running",
	"Swimming",
	"Harmonica",
	"IJK",
	"FJO",
	"CMS",
	"Theater",
	"Horse Riding",
	"Meditation",
	"Cold Plunges",
	"Primary School",
	"Around-the-World",
];

const MemoryForm: React.FC = () => {
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

	const [mediaType, setMediaType] = useState("");

	useEffect(() => {
		register("category_ids");
	}, [register]);

	const handleMediaType = (type: string) => {
		setMediaType(type);
	};

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

			switch (mediaType) {
				case "image":
					if (data.image && data.image.length > 0) {
						formData.append("image", data.image[0]);
					}
					break;
				case "audio":
					if (data.audio && data.audio.length > 0) {
						formData.append("audio", data.audio[0]);
					}
					break;
				case "video":
					if (data.video && data.video.length > 0) {
						formData.append("video", data.video[0]);
					}
					break;
				case "url":
					if (data.url) {
						formData.append("url", data.url[0]);
					}
					break;
				default:
					break;
			}

			// Make the new memory creation request
			const response = await http.post("/api/auth/memory", data);

			// Handle success (redirect or show a success message)
			console.log(response.data);
		} catch {
			console.log("ERROR creating new memory");
		}
	};

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
						<p className='text-sm font-light text-red-500 '>
							Please select one option.
						</p>
					)}
				</fieldset>

				{/* Memory Categories */}
				<article className='mt-10 font-light'>
					<fieldset className='relative flex flex-wrap justify-center w-full p-4 pt-6 border-[2.5px] rounded-[3px] border-black'>
						<legend className='absolute flex px-2 text-sm text-black bg-white -top-3 left-4'>
							Category
						</legend>
						{categories.map((category) => (
							<label
								key={category}
								htmlFor={`category-${category}`}
								className={`flex px-3 mx-2 my-1 border border-black rounded cursor-pointer w-fit  ${
									getValues("category_ids").includes(category)
										? "bg-white text-black"
										: "bg-black text-white"
								} hover:bg-white hover:text-black`}>
								{category}
								<input
									id={`category-${category}`}
									className='hidden'
									type='checkbox'
									{...register("category_ids", {
										required: "Please select at least one category.",
									})}
									value={category}
								/>
							</label>
						))}
					</fieldset>
					{errors.category_ids && (
						<p className='mt-1 text-sm text-red-500'>
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
					<p className='mt-1 text-sm font-light text-red-500'>
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
					<p className='mt-1 text-sm font-light text-red-500'>
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
							{/* Upload Image */}
							<div>
								<button
									type='button'
									className={`text-sm font-light block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
										mediaType === "image" ? "hidden" : "bg-black text-white"
									}`}
									onClick={() => handleMediaType("image")}>
									Upload an Image
								</button>
								{mediaType === "image" && (
									<div className='mt-2'>
										<input
											id='url'
											type='file'
											accept='image/*'
											multiple
											{...register("image", { required: true })}
											className='block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
										/>
										<p className='mt-1 text-sm font-light text-red-500'>
											{errors.image?.message}
										</p>
									</div>
								)}
							</div>

							{/* Upload Audio */}
							<div>
								<button
									type='button'
									className={`text-sm font-light block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
										mediaType === "audio" ? "hidden" : "bg-black text-white"
									}`}
									onClick={() => handleMediaType("audio")}>
									Upload an Audio File
								</button>
								{mediaType === "audio" && (
									<div className='mt-2'>
										<input
											type='file'
											accept='audio/*'
											{...register("audio", { required: true })}
											className='block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
										/>
										<p className='mt-1 text-sm font-light text-red-500'>
											{errors.audio?.message}
										</p>
									</div>
								)}
							</div>

							{/* Upload Video */}
							<div>
								<button
									type='button'
									className={`text-sm font-light block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
										mediaType === "video" ? "hidden" : "bg-black text-white"
									}`}
									onClick={() => handleMediaType("video")}>
									Upload a Video
								</button>
								{mediaType === "video" && (
									<div className='mt-2'>
										<input
											type='file'
											accept='video/*'
											{...register("video", { required: true })}
											className='block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
										/>
										<p className='mt-1 text-sm font-light text-red-500'>
											{errors.video?.message}
										</p>
									</div>
								)}
							</div>

							{/* Add URL */}
							<hr className='relative border-black rounded-lg border-1' />
							<div>
								<button
									type='button'
									className={`text-sm font-light block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
										mediaType === "url" ? "hidden" : "bg-black text-white"
									}`}
									onClick={() => handleMediaType("url")}>
									Add a URL
								</button>
								{mediaType === "url" && (
									<div className='mt-2'>
										<input
											id='url'
											type='text'
											placeholder='https://wwww.mySite.com'
											{...register("url", { required: true })}
											className='block w-full rounded-[3px] border-0 py-2 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
										/>
										<p className='mt-1 text-sm font-light text-red-500'>
											{errors.url?.message}
										</p>
									</div>
								)}
							</div>
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
						<p className='mt-1 text-sm font-light text-red-500'>
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
						<p className='mt-1 text-sm text-red-500'>{errors.month?.message}</p>

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
						<p className='mt-1 text-sm font-light text-red-500'>
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
