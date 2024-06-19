import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import CustomButton from "./CustomButton";
import http from "../utils/http";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const relationships = ["Family", "Friend", "Teacher"];

type RegisterFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	relationshipToKid: "Family" | "Friend" | "Teacher" | "Select a relationship.";
	terms: boolean;
	avatar_path: FileList | null;
};

const RegisterForm = () => {
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

	const {
		register,
		control,
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

	// Get the current value of 'password' using watch -- throwing me an error otherwise
	const password = watch("password", "");

	// for the onSubmit inside the form tag
	const onSubmit = async (formData: RegisterFormValues) => {
		const data = new FormData();
		data.append("firstName", formData.firstName);
		data.append("lastName", formData.lastName);
		data.append("email", formData.email);
		data.append("password", formData.password);
		data.append("passwordConfirmation", formData.passwordConfirmation);
		data.append("relationshipToKid", formData.relationshipToKid);
		data.append("terms", formData.terms ? "1" : "0");
		if (formData.avatar_path) {
			data.append("avatar_path", formData.avatar_path[0]);
		}

		try {
			// Request CSRF token
			await http.get("/sanctum/csrf-cookie");
			// const response = await http.post("api/auth/register", formData, {
			await http.post("api/auth/register", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("Registration worked!");
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};

	useEffect(() => {
		return () => {
			if (avatarPreview) {
				URL.revokeObjectURL(avatarPreview);
			}
		};
	}, [avatarPreview]);

	return (
		<>
			<form
				className='mt-4 space-y-10'
				noValidate
				onSubmit={handleSubmit(onSubmit)}>
				{/* Avatar Preview */}
				<div className='flex flex-col items-center gap-y-4'>
					{avatarPreview ? (
						<img
							src={avatarPreview}
							alt='User avatar'
							className='object-cover w-12 h-12 rounded-full'
						/>
					) : (
						<UserCircleIcon
							className='w-12 h-12 text-gray-300'
							aria-hidden='true'
						/>
					)}
					{/* Avatar */}
					<div className='relative px-2 py-1 text-xs text-gray-500 bg-gray-300 rounded-lg'>
						Upload avatar!
						<input
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
							// pointer only works when 'hidden', but the btn functionality only on 'opacity-0'
							className='absolute top-0 opacity-0 cursor-pointer -left-20'
						/>
					</div>

					<p className='mt-2 text-sm text-orange-500'>
						{errors.avatar_path?.message}
					</p>
				</div>
				{/* First Name */}
				<div className='relative'>
					<label
						htmlFor='firstName'
						className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						First Name
					</label>
					<input
						type='text'
						className='"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"'
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
						className='"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"'
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
							validate: {
								matchPassword: (value) =>
									value === password || "Passwords do not match.",
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
						<option value='Select a relationship.' disabled>
							Select a relationship
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
				<div className='flex flex-col min-w-[17.5rem] -ml-4 sm:ml-0'>
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
				{/* Register Button */}
				<CustomButton
					type='submit'
					classes='rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
					text='Register'
				/>{" "}
			</form>
			<DevTool control={control} />
		</>
	);
};

export default RegisterForm;
