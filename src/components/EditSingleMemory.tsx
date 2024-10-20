import IconTrash from "./IconTrash";
import mime from "mime";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetcher } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import displayFile from "../utils/DisplayFile";
import { MemoryValues } from "../types/MemoryValues";
import Tailspin from "./Tailspin";
import { useEffect, useState } from "react";
import http from "../utils/http";
import { days, kidOptions, months, years } from "../utils/memoryUtils";
import defaultAvatar from "../assets/default-avatar.jpg";

// Helper function to format the date
const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return date.toLocaleDateString("en-US", options);
};

type Props = {
	memory: MemoryValues;
};

const EditSingleMemory = ({ memory }: Props) => {
	const { enabled } = useTheme();
	const fetcher = useFetcher();
	const [showEdit, setShowEdit] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<MemoryValues>({
		defaultValues: {
			title: memory.title,
			description: memory.description,
			month: memory.month,
			day: memory.day,
			year: memory.year,
			kid: memory.kid, // Ensure this matches the form field name
			category_ids: memory.category_ids || [],
		},
	});

	const [categories, setCategories] = useState<
		{ id: string; category: string }[]
	>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	// Load categories on component mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await http.get("/api/auth/categories");
				setCategories(response.data);
				// Initialize selected categories
				if (memory.category_ids) {
					setSelectedCategories(memory.category_ids.map((id) => id.toString()));
				}
			} catch (error) {
				console.error("Failed to fetch categories", error);
			}
		};

		fetchCategories();
	}, [memory]);

	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategories((prev) => {
			const isSelected = prev.includes(categoryId);
			const updatedCategories = isSelected
				? prev.filter((id) => id !== categoryId) // Deselect
				: [...prev, categoryId]; // Select

			// Update form values (assuming you have a function or a way to update form values)
			setValue("category_ids", updatedCategories);

			return updatedCategories;
		});
	};

	const onValid: SubmitHandler<MemoryValues> = (data, event) => {
		const formData = new FormData(event?.target as HTMLFormElement);

		// Log category IDs to verify they are correct
		const categoryIds = getValues("category_ids");

		// Remove existing category_ids from FormData
		formData.delete("category_ids");

		// Add category_ids to FormData
		if (Array.isArray(categoryIds)) {
			categoryIds.forEach((id) => formData.append("category_ids[]", id));
		} else {
			formData.append("category_ids[]", categoryIds);
		}

		// Prepare URLs if needed
		const urlList = Array.isArray(data.urls) ? data.urls : [];
		const formattedUrls = urlList.map((url) => ({
			id: url.url_address,
			url_address: url.url_address,
		}));

		// Append additional data to FormData
		formData.append("id", memory.id.toString());
		formData.append("urls", JSON.stringify(formattedUrls));

		// Submit the data
		fetcher.submit(formData, {
			method: "PATCH",
			action: "",
		});
	};

	const submitting = fetcher.state === "submitting";
	const intentDelete = fetcher.formData?.get("intent") === "delete";
	const intentPatch = fetcher.formData?.get("intent") === "patch";
	const isDeleting = submitting && intentDelete;
	const isPatching = submitting && intentPatch;

	return (
		<>
			<article
				key={memory.title}
				className='flex flex-col items-end gap-6 mb-20 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
				{/* Entry Header */}
				<section className='flex flex-col w-full'>
					<div className='flex justify-end mb-2'>
						<img
							className='w-10 h-10 rounded rounded-tl-xl'
							src={
								memory.user.avatar
									? `${import.meta.env.VITE_API_URL}/storage/${
											memory.user.avatar.avatar_path
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  }`
									: defaultAvatar
							}
							alt={`Picture of ${memory.user.first_name} ${memory.user.last_name}`}
						/>
					</div>
					<div
						className={`${
							enabled ? "text-gray-600" : "text-black text-opacity-40"
						} w-full font-medium`}>
						<p>{formatDate(memory.created_at)}</p>
						<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
					</div>
				</section>
				{/* Entry Body */}
				<section>
					<h1
						className={`font-sans underline text-2xl font-medium tracking-widest ${
							enabled ? "text-gray-200 mb-3" : "text-black mb-6"
						}`}>
						{memory.title}{" "}
					</h1>
					<p
						className={`${
							enabled ? "text-gray-300" : "text-black"
						} 'text-black break-words'`}>
						{memory.description}
					</p>
				</section>
				<div>
					<h2
						className={`font-medium text-black ${
							enabled ? "text-gray-400" : "text-opacity-40"
						} font-normal tracking-widest`}>
						Date of Memory
					</h2>
					<p className={`${enabled ? "text-white" : "text-black"}`}>
						{memory.month} <span> {memory.day},</span> {memory.year}
					</p>
				</div>
				{/* Files */}
				<div className=''>
					<h2
						className={`font-medium text-black ${
							enabled ? "text-gray-400" : "text-opacity-40"
						} font-normal tracking-widest`}>
						Files
					</h2>
					<ul className='flex flex-col items-center justify-center'>
						{memory.files && memory.files.length > 0 ? (
							memory.files.map((file) => (
								<li
									className={`object-cover mt-4 ${
										mime.getType(file.file_path)?.startsWith("image/") ||
										mime.getType(file.file_path)?.startsWith("video/")
											? "h-auto"
											: "h-auto min-w-[80vw]"
									}`}
									key={file.id}>
									{displayFile(file)}
								</li>
							))
						) : (
							<p className={`${enabled ? "text-white" : "text-black"}`}>
								No files available
							</p>
						)}
					</ul>
				</div>
				{/* URLs */}
				<div>
					<h2
						className={`font-medium text-black  ${
							enabled ? "text-gray-400" : "text-opacity-40"
						} font-normal tracking-widest`}>
						URLs
					</h2>
					<ul>
						{memory.urls && memory.urls.length > 0 ? (
							memory.urls.map((url) => (
								<li key={url.id}>
									<a
										className={`${enabled ? "text-white" : "text-black"}`}
										href={url.url_address}
										target='_blank'
										rel='noopener noreferrer'>
										{url.url_address}
									</a>
								</li>
							))
						) : (
							<p className={`${enabled ? "text-white" : "text-black"}`}>
								No URLs available
							</p>
						)}
					</ul>
				</div>
				<div className='flex justify-between gap-4'>
					<img
						className={`${
							enabled ? "text-white" : ""
						} 'w-8 h-8 cursor-pointer'`}
						src='/src/assets/EditIcon.svg'
						alt='link to edit entry'
						onClick={() => setShowEdit(!showEdit)}
					/>

					<fetcher.Form method='delete' action='/memories'>
						<input type='hidden' name='intent' value='delete' />
						<input type='hidden' name='title' value={memory.title} />
						<button
							disabled={isDeleting}
							className={`rounded ${
								enabled
									? "bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400"
									: "bg-red-600 text-black hover:bg-red-500 disabled:bg-gray-400"
							}`}>
							{isDeleting ? (
								<Tailspin />
							) : (
								<IconTrash
									className='w-8 h-8 p-[5px] disabled:cursor-not-allowed'
									title={`Trashcan icon for deleting memory ${memory.title}`}
								/>
							)}
						</button>
					</fetcher.Form>
				</div>
			</article>

			{/* ############################################################################################################################# */}
			{/* ###################################################### // EDIT FORM // ###################################################### */}
			{/* ############################################################################################################################# */}
			{showEdit ? (
				<form
					onSubmit={handleSubmit(onValid)}
					className='max-w-[30rem] px-10 flex flex-col mb-20'>
					<input type='hidden' {...register("intent")} value='patch' />
					<input type='hidden' name='id' value={memory.id} />
					{/* Form Title */}
					<h1 className='mt-4 font-bold text-center font-titles'>
						UPDATE MEMORY
					</h1>
					{/* Memory belongs to... */}
					<fieldset className='mt-8'>
						<div className='flex flex-row justify-between'>
							{kidOptions.map((option) => (
								<div key={option.id} className='flex item-center'>
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
										selectedCategories.includes(category.id)
											? "bg-white text-black" // Active styles
											: "bg-black text-white" // Inactive styles
									} hover:bg-white hover:text-black`}
									style={{
										backgroundColor: selectedCategories.includes(category.id)
											? "white"
											: "black",
										color: selectedCategories.includes(category.id)
											? "black"
											: "white",
									}}>
									{category.category}
									<input
										id={`category-${category.id}`}
										className='absolute top-0 left-0 w-full h-full opacity-0'
										type='checkbox'
										value={category.id}
										onChange={() => handleCategoryChange(category.id)}
										checked={selectedCategories.includes(category.id)} // Determines if checkbox is checked
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
						<label
							htmlFor='title'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Title
						</label>
						<input
							id='title'
							{...register("title", { required: true })}
							type='text'
							className='block w-full px-4 py-2 text-sm border rounded-md'
							defaultValue={memory.title}
						/>
						{errors.title && (
							<p className='mt-1 text-sm font-light text-orange-500'>
								This field is required.
							</p>
						)}
					</div>
					{/* Description */}
					<div className='mt-10'>
						<label
							htmlFor='description'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Description
						</label>
						<textarea
							id='description'
							{...register("description", { required: true })}
							className='block w-full px-4 py-2 text-sm border rounded-md'
							rows={4}
							defaultValue={memory.description}
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
								id='month'
								{...register("month")}
								className='block w-full px-4 py-2 text-sm border rounded-md'
								defaultValue={memory.month}>
								{months.map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>
							<select
								id='day'
								{...register("day")}
								className='block w-full px-4 py-2 text-sm border rounded-md'
								defaultValue={memory.day}>
								{days.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
							<select
								id='year'
								{...register("year")}
								className='block w-full px-4 py-2 text-sm border rounded-md'
								defaultValue={memory.year}>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Submit Button */}
					<button
						disabled={isPatching}
						className={`text-center rounded-md px-4 py-2 mt-10 ${
							enabled
								? "bg-gray-200 hover:bg-gray-100 text-black disabled:bg-gray-400"
								: "bg-gray-400 text-black hover:bg-gray-300 disabled:bg-gray-400"
						}`}>
						{isPatching ? <Tailspin /> : "Update"}
					</button>
				</form>
			) : null}
		</>
	);
};

export default EditSingleMemory;
