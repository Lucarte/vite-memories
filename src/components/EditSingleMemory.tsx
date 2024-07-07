import IconTrash from "./IconTrash";
import mime from "mime";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData, useFetcher } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import displayFile from "../utils/DisplayFile";
import { MemoryValues, PatchValues } from "../types/MemoryValues";
import Tailspin from "./Tailspin";
import { useEffect, useState } from "react";
import http from "../utils/http";

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

type Props = {
	memory: MemoryValues;
};

const EditSingleMemory = ({ memory }: Props) => {
	const { enabled } = useTheme();
	const fetcher = useFetcher();
	const [showEdit, setShowEdit] = useState(false);
	// Using useLoaderData to get the data loaded by the loader function
	const loaderData = useLoaderData();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<MemoryValues>({});

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

	const onValid: SubmitHandler<MemoryValues> = (data) => {
		// const onValid: SubmitHandler<PatchValues> = (data) => {
		// not sure if i should use data:PatchValues or formData:FormData
		console.log("VALID FORM SUBMISSION", data);
		// With fetcher.submit, we as developers decide when we send the form. In this case, we want to do it after validation.
		fetcher.submit(
			{ ...data, id: memory.id },
			{
				method: "PATCH",
				// action: "/api/auth/memories/{memory.id}", //already tested does not work
				action: "", // tested saturday 10:28 works
			}
		);
	};

	// just for debugging purposes
	useEffect(() => {
		console.log(fetcher.state);
	}, [fetcher.state]);

	const submitting = fetcher.state === "submitting";
	const intentDelete = fetcher.formData?.get("intent") === "delete";
	const intentPatch = fetcher.formData?.get("intent") === "patch";
	const isDeleting = submitting && intentDelete;
	const isPatching = submitting && intentPatch;

	return (
		<>
			<article
				key={memory.title}
				className='flex flex-col items-end gap-6 pt-16 overflow-hidden text-gray-300 screen mx-9 font-extralight'>
				{/* <Link to={memory.title} key={memory.title}> */}
				{/* Entry Header */}
				<section className='flex flex-col w-full'>
					<div className='flex justify-end mb-2'>
						<img
							className='w-12 h-12 rounded'
							src={
								memory.user.avatar
									? memory.user.avatar.avatar_path
									: "/src/media/defaultAvatar.png"
							}
							alt={`Picture of ${memory.user.first_name} ${memory.user.last_name}`}
						/>
					</div>
					<div className='flex flex-col items-end w-full text-gray-700'>
						<p>{`By: ${memory.user.first_name} ${memory.user.last_name}`}</p>
						<p>{formatDate(memory.created_at)}</p>
					</div>
				</section>
				{/* Entry Body */}
				<section className='w-screen'>
					<h1 className='mb-2 font-sans text-xl text-gray-200'>
						{memory.title}
					</h1>
					<p className='pl-20 break-words'>{memory.description}</p>
				</section>
				<div>
					<h2 className='font-medium'>Date of Memory</h2>
					<p>
						{memory.month} <span> {memory.day},</span> {memory.year}
					</p>
				</div>
				{/* Files */}
				<div className=''>
					<h2 className='font-medium'>Files</h2>
					<ul className='flex flex-col items-center justify-center'>
						{memory.files && memory.files.length > 0 ? (
							memory.files.map((file) => (
								<li
									className={`object-cover mt-10 ${
										(file.file_path &&
											mime.getType(file.file_path)?.startsWith("image/")) ||
										mime.getType(file.file_path)?.startsWith("video/")
											? "h-64"
											: "h-auto min-w-[80vw]"
									}`}
									key={file.id}>
									{displayFile(file)}
								</li>
							))
						) : (
							<p>No files available</p>
						)}
					</ul>
				</div>
				{/* </Link> */}
				<div className=''>
					<h2 className='font-medium'>URLs</h2>
					{memory.urls && memory.urls.length > 0 ? (
						memory.urls.map((url) => (
							<div className='' key={url.id}>
								<a
									href={url.url_address}
									target='_blank'
									rel='noopener noreferrer'>
									{url.url_address}
								</a>
							</div>
						))
					) : (
						<p>No URLs available</p>
					)}
				</div>
				<div className='flex justify-between gap-4'>
					<img
						className='w-8 h-8 cursor-pointer'
						// src='/src/media/featherEdit.png'
						src='src/assets/EditIcon.svg'
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
					className='max-w-[30rem] px-10 flex flex-col'>
					<input type='hidden' {...register("intent")} value='patch' />
					<input type='hidden' name='id' value={memory.id} />
					{/* <input type='hidden' name='title' value={memory.title} /> */}
					{/* Form Title */}
					<h1 className='mt-4 font-bold text-center font-titles'>
						UPDATE MEMORY
					</h1>
					{/* Memory belongs to... */}
					<fieldset className='mt-8'>
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
								className='block w-full px-4 py-2 text-sm border rounded-md'>
								{months.map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>
							<select
								id='day'
								{...register("day")}
								className='block w-full px-4 py-2 text-sm border rounded-md'>
								{days.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
							<select
								id='year'
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

					{/* Submit Button */}
					<button
						disabled={isPatching}
						className={`rounded-md px-4 py-2 mt-10 ${
							enabled
								? "bg-gray-200 hover:bg-gray-100 text-black disabled:bg-gray-400"
								: "bg-gray-400 text-black hover:bg-gray-300 disabled:bg-gray-400"
						}`}>
						{isPatching ? <Tailspin /> : "Update"}
						{/* // type='submit'
							// className='px-4 py-2 mt-10 text-white bg-black rounded-md'>
							// Update */}
					</button>
				</form>
			) : // <DevTool control={control} />
			// </>
			null}
		</>
	);
};

export default EditSingleMemory;
