/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import {
	ActionFunction,
	Link,
	useActionData,
	useLocation,
	useSubmit,
	useNavigate,
	json,
} from "react-router-dom";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useTheme } from "../context/ThemeContext";
import { login } from "../utils/api";
import DarkModeBtn from "../partials/DarkModeBtn";

type FormValues = {
	email: string;
	password: string;
};

type ActionData = {
	message?: string;
	error?: string;
};

// Success/Error Messages with alerts:
// 	try {
// 		await login(formData);
// 		alert("Going back in time, enjoy!");
// 		return redirect("/memories");
// 	} catch (error) {
// 		alert("WRONG CREDENTIALS!");
// 		return "An error occurred during login.";
// 	}
// };

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	try {
		await login(formData);
		// Return a success message
		return json({ message: "You have successfully logged in!" });
	} catch (error) {
		// Return an error message
		return json(
			{ error: "Login failed. Please check your credentials." },
			{ status: 400 }
		);
	}
};

const Login = () => {
	const { enabled } = useTheme();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const submit = useSubmit();
	const location = useLocation();
	const navigate = useNavigate();
	const actionData = useActionData() as ActionData; // Get the action data

	// Local state to handle messages and redirection
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Takes place when all fields validate
	const onValid: SubmitHandler<FormValues> = (data) => {
		submit(data, {
			action: location.pathname,
			method: "POST",
		});
	};

	// If errors found
	const onInvalid: SubmitErrorHandler<FieldValues> = (errors) => {
		console.log("Errors in Form: ", errors);
	};

	useEffect(() => {
		if (actionData) {
			if (actionData.message) {
				setMessage(actionData.message);
				// Redirect after a delay. Otherwise message cannot display
				setTimeout(() => {
					navigate("/memories");
				}, 2000);
			}
			if (actionData.error) {
				setError(actionData.error);
			}
		}
	}, [actionData, navigate]);

	return (
		<article className='flex flex-col items-center px-6 py-12 text-center md:mt-28 lg:px-8'>
			<DarkModeBtn />
			<h2
				className={`${
					enabled ? "text-white" : "text-gray-900"
				}, 'mt-8 font-serif text-xl text-center'`}>
				LOGIN
			</h2>
			<form
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(onValid, onInvalid)}
				className='mt-12 space-y-8 w-[16rem] md:w-[19rem] flex flex-col
				items-center'>
				<div className='relative'>
					<label
						htmlFor='email'
						className={`${
							enabled ? "bg-black text-white" : "text-gray-800 bg-white"
						} absolute inline-block px-2 text-xs font-light -top-2 left-4`}>
						E-Mail
					</label>
					<input
						autoComplete='false'
						id='email'
						type='email'
						className={`${
							enabled
								? "bg-black border-white text-white placeholder:text-gray-500 focus:ring-gray-400"
								: "bg-white border-black text-black placeholder:text-gray-500 focus:ring-orange-600"
						} w-full rounded-[3px] py-4 px-6 shadow-sm ring-[2.5px] ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
						placeholder='me@gmail.com'
						aria-invalid={errors.email ? "true" : "false"}
						{...register("email", {
							required: {
								value: true,
								message: "Please enter an email",
							},
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email format",
							},
						})}
					/>
					<p className='mt-2 text-sm text-orange-500'>
						{errors.email?.message}
					</p>
				</div>
				<div className='relative'>
					<label
						htmlFor='password'
						className={`${
							enabled ? "bg-black text-white" : "text-gray-800 bg-white"
						} absolute inline-block px-2 text-xs font-light -top-2 left-4`}>
						Password
					</label>
					<input
						id='password'
						className={`${
							enabled
								? "bg-black border-white text-white placeholder:text-gray-500 focus:ring-gray-400"
								: "bg-white border-black text-black placeholder:text-gray-500 focus:ring-orange-600"
						} w-full rounded-[3px] py-4 px-6  shadow-sm ring-[2.5px] ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
						placeholder='password'
						type='password'
						aria-invalid={errors.password ? "true" : "false"}
						{...register("password", {
							required: {
								value: true,
								message: "Please enter a password",
							},
							validate: {
								minLength: (value) =>
									value.length >= 8 ||
									"Password must be at least 8 characters long",
								lowercase: (value) =>
									/^(?=.*[a-z])/.test(value) ||
									"Password must contain at least one lowercase letter",
								uppercase: (value) =>
									/^(?=.*[A-Z])/.test(value) ||
									"Password must contain at least one uppercase letter",
								number: (value) =>
									/^(?=.*\d)/.test(value) ||
									"Password must contain at least one number",
								specialChar: (value) =>
									/^(?=.*[@$!%*?&])/.test(value) ||
									"Password must contain at least one special character",
							},
						})}
					/>
					<p className='mt-2 text-sm text-orange-500'>
						{errors.password?.message}
					</p>
				</div>
				<CustomButton
					type='submit'
					classes={`${
						enabled
							? "bg-white text-black hover:bg-gray-300"
							: "bg-black text-white hover:bg-gray-500"
					} rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-medium leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
					text='Enter Memories Portal'
				/>{" "}
			</form>
			{/* Displaying action messages */}
			{message && <p className='mt-4 text-green-500'>{message}</p>}
			{error && <p className='mt-4 text-red-500'>{error}</p>}
			<div
				className={`${
					enabled ? "text-white" : "text-black"
				} flex justify-center gap-2 text-sm mt-28`}>
				Not a fan yet?{" "}
				<p className='font-semibold hover:text-gray-500'>
					<Link to='/registration'>
						Register <span className='underline'>here!</span>
					</Link>
				</p>
			</div>
			<DevTool control={control} />
		</article>
	);
};

export default Login;
