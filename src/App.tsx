import { FormEvent, useState } from "react";
import "./App.css";
import http from "../utilities/http";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import AppHeading from "./AppHeading";

function App() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [relationshipToKid, setRelationshipToKid] = useState("");
	const [terms, setTerms] = useState(false);
	const [avatar, setAvatar] = useState("");
	const [enabled, setEnabled] = useState(false);

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
		<html className='h-full bg-white'>
			<AppHeading />
			<body className='h-full relative'>
				{/* Dark/Light Button & Up Button DIV */}
				<div className='fixed bottom-[2rem] left-0 right-0 flex justify-between px-4 items-center'>
					{/* Dark/Light Modus btn  */}
					<Switch
						checked={enabled}
						onChange={setEnabled}
						className={classNames(
							enabled ? "bg-white" : "bg-black",
							"inline-flex h-3 w-6 flex-shrink-0 cursor-pointer rounded-full border-[1px] border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-600"
						)}>
						<span className='sr-only'>Use setting</span>
						<span
							aria-hidden='true'
							className={classNames(
								enabled
									? "translate-x-2.5 bg-black"
									: "translate-x-0  bg-white",
								"pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
							)}
						/>
					</Switch>

					{/* Up Button  */}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='35'
						height='35'
						viewBox='0 0 35 35'>
						<g
							id='Home_Btn'
							data-name='Home Btn'
							transform='translate(-308 -3404)'>
							<circle
								id='Ellipse_1'
								data-name='Ellipse 1'
								cx='17.5'
								cy='17.5'
								r='17.5'
								transform='translate(308 3404)'
								fill='#fff'
							/>
							<path
								id='Icon_material-keyboard-arrow-up'
								data-name='Icon material-keyboard-arrow-up'
								d='M12.948,28.352,18,13l5.007,15.185.02.062.036.109L24,21.761,18,8.4,12.221,21.761Z'
								transform='translate(307.779 3403.604)'
								fill='#f77403'
								stroke='#f77403'
								stroke-width='2'
							/>
						</g>
					</svg>
				</div>

				<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='mb-4 text-center font-serif text-xl leading-8 text-gray-900'>
							Become fan of my <br />
							Pearls of Great Price
						</h2>
					</div>

					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						{/* 
						=====================================================================================================
						=====================================================================================================
						=====================================================================================================
						==============================================  //  FORM  //  =======================================
						=====================================================================================================
						=====================================================================================================
						=====================================================================================================
						*/}
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

						<p className='mt-10 text-center text-sm text-gray-900'>
							Not a fan yet?{" "}
							<a
								href='#'
								className='font-semibold leading-6 text-gray-900 hover:text-gray-500'>
								Register <span className='underline'>here!</span>
							</a>
						</p>
					</div>
				</div>
			</body>
		</html>
	);
}

export default App;
