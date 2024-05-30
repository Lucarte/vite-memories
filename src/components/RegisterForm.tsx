import React, { FormEvent, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import http from "../utils/http";

const RegisterForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [relationshipToKid, setRelationshipToKid] = useState("");
	const [terms, setTerms] = useState(false);
	const [avatar, setAvatar] = useState("");

	// for the onSubmit inside the form tag
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await http.get("/sanctum/csrf-cookie");
			await http.post("api/auth/register", {
				firstName,
				lastName,
				email,
				password,
				passwordConfirmation,
				relationshipToKid,
				terms,
			});
		} catch {
			//
		}
	};
	return (
		<form
			className='space-y-8'
			action='#'
			// method='POST'
			onSubmit={handleSubmit}>
			{/* First Name */}
			<div className='relative'>
				<label
					htmlFor='firstName'
					className='absolute -top-2 left-4 font-light inline-block bg-white px-2 text-xs text-gray-800'>
					First Name
				</label>
				<input
					type='text'
					name='firstName'
					id='firstName'
					className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
					placeholder='Gabriel'
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
				/>
			</div>

			{/* Last Name */}
			<div className='relative'>
				<label
					htmlFor='lastName'
					className='absolute -top-2 left-4 font-light inline-block bg-white px-2 text-xs text-gray-800'>
					Last Name
				</label>
				<input
					type='text'
					name='lastName'
					id='lastName'
					className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
					placeholder='Moreno'
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
				/>
			</div>

			{/* E-Mail */}
			<div className='relative'>
				<label
					htmlFor='email'
					className='absolute -top-2 left-4 font-light inline-block bg-white px-2 text-xs text-gray-800'>
					E-Mail
				</label>
				<input
					type='email'
					name='email'
					id='email'
					className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
					placeholder='me@mail.com'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</div>

			{/* Password */}
			<div className='relative'>
				<label
					htmlFor='password'
					className='absolute -top-2 left-4 font-light inline-block bg-white px-2 text-xs text-gray-800'>
					Password
				</label>
				<input
					type='password'
					name='password'
					id='password'
					autoComplete='current-password'
					className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
					placeholder='1ShortJoke!'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>

			{/* Password */}
			<div className='relative'>
				<label
					htmlFor='passwordConfirmation'
					className='absolute -top-2 left-4 font-light inline-block bg-white px-2 text-xs text-gray-800'>
					Password Confirmation
				</label>
				<input
					type='password'
					name='passwordConfirmation'
					id='passwordConfirmation'
					autoComplete='current-password'
					className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
					placeholder='SameShortJoke!'
					value={passwordConfirmation}
					onChange={(e) => {
						setPasswordConfirmation(e.target.value);
					}}
				/>
			</div>

			{/* Relationship to kid */}
			<div className='relative'>
				<div className='mt-2'>
					<select
						id='relationshipToKid'
						name='relationshipToKid'
						value={relationshipToKid}
						onChange={(e) => {
							setRelationshipToKid(e.target.value);
						}}
						className='block w-full rounded-[3px] font-light border-0 py-2 px-6 bg-gray-200 text-gray-500 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'>
						<option>Choose Relationship to Kid</option>
						<option>Family</option>
						<option>Friend</option>
						<option>Teacher</option>
					</select>
				</div>
			</div>

			{/* Avatar */}
			<div className='col-span-full'>
				<label
					htmlFor='photo'
					className='flex mt-10 justify-start text-sm leading-6 text-gray-900'>
					Profile Picture
				</label>
				<div className='mt-2 flex items-center gap-x-3'>
					<UserCircleIcon
						className='h-12 w-12 text-gray-300'
						aria-hidden='true'
					/>
					<button
						type='button'
						className='rounded-[3px] bg-white px-2 py-1 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
						Change
					</button>
				</div>
			</div>

			<div className='col-span-full'>
				<div className='mt-2 mb-10 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
					<div className='text-center'>
						<PhotoIcon
							className='mx-auto h-12 w-12 text-gray-300'
							aria-hidden='true'
						/>
						<div className='mt-4 flex text-sm leading-6 text-gray-600'>
							<label
								htmlFor='avatar'
								className='relative cursor-pointer rounded-sm bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500'>
								<span>Upload a picture</span>
								<input
									id='avatar'
									name='avatar'
									type='file'
									className='sr-only'
									value={avatar}
									onChange={(e) => {
										setAvatar(e.target.value);
									}}
								/>
							</label>
							<p className='pl-1'>or drag and drop</p>
						</div>
						<p className='text-xs leading-5 text-gray-600'>
							PNG, JPG, GIF up to 10MB
						</p>
					</div>
				</div>
			</div>

			{/* Terms */}
			<div className='relative flex gap-x-3 justify-center'>
				<div className='flex h-6 items-center'>
					<input
						id='terms'
						name='terms'
						type='checkbox'
						className='h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600'
						checked={terms}
						onChange={(e) => {
							setTerms(e.target.checked);
						}}
					/>
				</div>
				<div className='text-sm leading-6'>
					<label htmlFor='terms' className=' text-gray-900'>
						Accept{" "}
						<span className='underline hover:font-medium'>
							Terms & Conditions
						</span>
					</label>
				</div>
			</div>

			{/* Register Button */}
			<div className='flex justify-center'>
				<button
					type='submit'
					className='flex justify-center rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
					Register
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
