import { SubmitHandler, useForm } from "react-hook-form";
import CustomButton from "./CustomButton";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { RegisterFormValues } from "../types/RegisterFormValues";
import { useSubmit, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import classNames from "classnames";

const relationships = ["Family", "Friend", "Teacher"];

const RegisterForm = ({
	actionData,
}: {
	actionData?: {
		successMessage?: string;
		errorMessage?: string;
		redirectTo?: string;
	};
}) => {
	const { enabled } = useTheme();
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			relationshipToKid: "Select a relationship.",
			terms: false,
			avatar_path: null,
		},
	});
	const submit = useSubmit();

	const onValid: SubmitHandler<RegisterFormValues> = (_, event) => {
		const formData = new FormData(event?.target);
		submit(formData, {
			method: "POST",
			action: location.pathname,
			encType: "multipart/form-data",
		});
		console.log("Registration Data: ", formData);
	};

	useEffect(() => {
		return () => {
			if (avatarPreview) {
				URL.revokeObjectURL(avatarPreview);
			}
		};
	}, [avatarPreview]);

	useEffect(() => {
		// Handle successful registration
		if (actionData?.successMessage && actionData?.redirectTo) {
			setTimeout(() => {
				if (actionData.redirectTo) {
					navigate(actionData.redirectTo);
				}
			}, 3000);
		}

		// Handle registration error
		if (actionData?.errorMessage) {
			setTimeout(() => {
				navigate("/register");
			}, 22000);
		}
	}, [actionData, navigate]);

	return (
		<>
			<form
				className='mt-4 space-y-6 text-center'
				noValidate
				onSubmit={handleSubmit(onValid)}>
				{/* Avatar Preview */}
				<div className='flex flex-col items-center gap-y-2'>
					{avatarPreview ? (
						<img
							src={avatarPreview}
							alt='User avatar'
							className={`${
								enabled ? "bg-white" : "bg-gray-400"
							} object-cover w-10 h-10 rounded rounded-tl-xl-full`}
						/>
					) : (
						<UserCircleIcon
							className={`${
								enabled ? "text-gray-100" : "text-gray-300"
							} w-12 h-12 `}
							aria-hidden='true'
						/>
					)}
					{/* Avatar */}
					<div
						className={`${
							enabled ? "bg-white" : "bg-gray-300"
						} relative px-[9px] py-[5px] text-xs text-gray-500  rounded-md`}>
						Upload avatar!
						<input
							className='absolute top-0 opacity-0 cursor-pointer -left-20'
							id='avatar_path'
							type='file'
							{...register("avatar_path", {
								onChange: (e) => {
									setAvatarPreview(
										e.target.files?.[0]
											? URL.createObjectURL(e.target.files[0])
											: null
									);
								},
								validate: {
									fileType: (files: FileList | null) =>
										!files ||
										(files.length > 0 &&
											[
												"image/jpeg",
												"image/jpg",
												"image/png",
												"image/gif",
												"image/svg+xml",
											].includes(files[0].type)) ||
										"Invalid file type. Only JPG, JPEG, PNG, GIF, and SVG are allowed.",
									fileSize: (files: FileList | null) =>
										!files ||
										(files.length > 0 && files[0].size <= 2048 * 1024) || // 2 MB (in bytes)
										"File size exceeds 2 MB.",
								},
							})}
						/>
					</div>
					<p className='mt-2 text-sm text-orange-500'>
						{errors.avatar_path?.message}
					</p>
				</div>
				<div className='space-y-10'>
					{/* First Name */}
					<div className='relative'>
						<label
							htmlFor='firstName'
							className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
							First Name
						</label>
						<input
							type='text'
							className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							placeholder='Mariana'
							aria-invalid={errors.firstName ? "true" : "false"}
							{...register("firstName", {
								required: {
									value: true,
									message: "Got a first name?",
								},
								minLength: {
									value: 2,
									message: "Minimum length is 2 characters.",
								},
								maxLength: {
									value: 16,
									message: "Maximum length is 16 characters.",
								},
							})}
						/>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.firstName?.message}
						</p>
					</div>
					{/* Last Name */}
					<div className='relative'>
						<label
							htmlFor='lastName'
							className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
							Last Name
						</label>
						<input
							type='text'
							className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							placeholder='Lucht'
							aria-invalid={errors.lastName ? "true" : "false"}
							{...register("lastName", {
								required: {
									value: true,
									message: "How about a last name?",
								},
								minLength: {
									value: 2,
									message: "Minimum length is 2 characters.",
								},
								maxLength: {
									value: 16,
									message: "Maximum length is 16 characters.",
								},
							})}
						/>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.lastName?.message}
						</p>
					</div>
					{/* E-Mail */}
					<div className='relative'>
						<label
							htmlFor='email'
							className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
							E-Mail
						</label>
						<input
							type='email'
							className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							placeholder='you@mail.com'
							aria-invalid={errors.email ? "true" : "false"}
							{...register("email", {
								required: {
									value: true,
									message: "Don't forget your email!",
								},
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Invalid email format.",
								},
							})}
						/>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.email?.message}
						</p>
					</div>
					{/* PASSWORD */}
					<div className='relative'>
						<label
							htmlFor='password'
							className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
							Password
						</label>
						<input
							className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							placeholder='OneShortJoke!'
							type='password'
							aria-invalid={errors.password ? "true" : "false"}
							{...register("password", {
								required: {
									value: true,
									message: "Create a password!",
								},
								validate: {
									minLength: (value) =>
										value.length >= 8 || "Password must be 8 characters long.",
									lowercase: (value) =>
										/^(?=.*[a-z])/.test(value) ||
										"Password must contain at least one lowercase letter.",
									uppercase: (value) =>
										/^(?=.*[A-Z])/.test(value) ||
										"Password must contain at least one uppercase letter.",
									number: (value) =>
										/^(?=.*\d)/.test(value) ||
										"Password must contain at least one number.",
									specialChar: (value) =>
										/^(?=.*[@$!%*?&])/.test(value) ||
										"Password must contain at least one special character.",
								},
							})}
						/>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.password?.message}
						</p>
					</div>
					{/* PASSWORD CONFIRMATION */}
					<div className='relative'>
						<label
							htmlFor='passwordConfirmation'
							className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
							Password Confirmation
						</label>
						<input
							className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							placeholder='SameShortJoke!'
							type='password'
							aria-invalid={errors.password ? "true" : "false"}
							{...register("passwordConfirmation", {
								required: "Re-enter your password.",
								validate: (value: string) => {
									if (watch("password") !== value) {
										return "Passwords do not match";
									}
								},
							})}
						/>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.passwordConfirmation?.message}
						</p>
					</div>
					{/* RELATIONSHIP */}
					<div>
						<select
							className='block w-full rounded-[3px] font-light border-0 py-2 px-6 bg-gray-100 text-gray-500 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
							aria-invalid={errors.relationshipToKid ? "true" : "false"}
							{...register("relationshipToKid", {
								validate: (value) => {
									return (
										value !== "Select a relationship." || "How are you related?"
									);
								},
							})}>
							<option value='Select a relationship.'>
								Select a relationship.
							</option>
							{relationships.map((relationship) => (
								<option key={relationship} value={relationship}>
									{relationship}
								</option>
							))}
						</select>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.relationshipToKid?.message}
						</p>
					</div>
					{/* TERMS */}
					<div className='flex text-sm flex-col min-w-[17.5rem] sm:ml-0'>
						<div className='flex items-center justify-center h-6 gap-x-3'>
							<input
								className='w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-orange-600'
								aria-invalid={errors.terms ? "true" : "false"}
								type='checkbox'
								{...register("terms", {
									required: "You must accept the terms and conditions.",
								})}
							/>
							<label htmlFor='terms' className=''>
								I accept the{" "}
								<a
									href='#'
									className='underline cursor-pointer hover:text-gray-600'>
									Terms and Conditions
								</a>
								<span>.</span>
							</label>
						</div>
						<p className='mt-2 text-sm text-orange-500'>
							{errors.terms?.message}
						</p>
					</div>
				</div>
				{/* Register Button */}
				<CustomButton
					type='submit'
					// label='Register'
					classes={classNames(
						enabled ? "bg-white text-black" : "bg-black text-white",
						"rounded-bl-2xl rounded-tr-2xl px-6 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
					)}
					text='Register'
					disabled={Object.keys(errors).length > 0}
				/>
				{/* Overlay for success messages */}
				{actionData?.successMessage && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='w-64 p-8 text-lg font-extrabold uppercase bg-white rounded-tr-lg shadow-lg rounded-3xl font-titles'>
							<p className='text-black'>{actionData.successMessage}</p>
						</div>
					</div>
				)}
				{/* Overlay for error messages */}
				{actionData?.errorMessage && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='w-56 p-8 text-lg font-extrabold uppercase bg-white rounded-tr-lg shadow-lg rounded-3xl font-titles'>
							<p className='text-black'>{actionData.errorMessage}</p>
						</div>
					</div>
				)}
				{/* </div> */}
			</form>
		</>
	);
};

export default RegisterForm;
