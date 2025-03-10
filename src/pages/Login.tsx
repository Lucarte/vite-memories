/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import {
	ActionFunction,
	Link,
	useLocation,
	useSubmit,
	useNavigate,
	useActionData,
} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTheme } from "../context/ThemeContext";
import { login } from "../utils/api";
import { json } from "react-router-dom";
import HidePasswordIcon from "../assets/HidePasswordIcon.svg";
import ShowPasswordIcon from "../assets/ShowPasswordIcon.svg";

type FormValues = {
	email: string;
	password: string;
};

// action function (modified to handle login status check)
export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	console.log("Login Form data now received:", formData); // Log the form data

	const { status, data } = await login(formData);
	console.log("Login response:", { status, data }); // Log the login response

	if (status === 403) {
		// Account not approved
		console.log("Account not approved"); // Log account not approved
		return json(
			{
				errorMessage: data.errorMessage || "Your account is pending approval.",
			},
			{ status: 403 }
		);
	}

	if (status === 401 || status === 400) {
		// Invalid credentials or bad request
		console.log("Invalid credentials or bad request"); // Log invalid credentials
		return json(
			{
				errorMessage: "Invalid credentials. Only registered users can log in.",
			},
			{ status }
		);
	}

	if (status === 200) {
		// Successful login
		console.log("Login successful"); // Log successful login
		return json(
			{
				successMessage: data.successMessage,
				redirectTo: data.redirectTo ?? "/",
			},
			{ status: 200 }
		);
	}

	// Catch-all for unexpected statuses
	console.log("From login - status:", status); // Log unexpected response status
	return json(
		{ errorMessage: "Something went wrong. Please try again later." },
		{ status: 500 }
	);
};

const Login = () => {
	const { enabled } = useTheme();
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>();
	const submit = useSubmit();
	const location = useLocation();

	const actionData = useActionData() as {
		successMessage?: string;
		errorMessage?: string;
		redirectTo?: string;
		isApproved?: boolean;
	};
	const navigate = useNavigate();
	const [, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	useEffect(() => {
		if (actionData?.errorMessage) {
			console.log("Error message received:", actionData.errorMessage); // Log error message
			setMessage({ type: "error", text: actionData.errorMessage });
		} else if (actionData?.successMessage && actionData.isApproved) {
			console.log("Success message received:", actionData.successMessage); // Log success message
			setMessage({ type: "success", text: actionData.successMessage });
			setTimeout(() => {
				console.log("Redirecting to:", actionData.redirectTo || "/dashboard"); // Log redirect
				navigate(actionData.redirectTo || "/dashboard");
			}, 1500);
		}
	}, [actionData, navigate]);

	const validatePassword = (value: string) => {
		if (value.length < 8) return "Password must be at least 8 characters long";
		if (!/(?=.*[a-z])/.test(value))
			return "Password must contain at least one lowercase letter";
		if (!/(?=.*[A-Z])/.test(value))
			return "Password must contain at least one uppercase letter";
		if (!/(?=.*\d)/.test(value))
			return "Password must contain at least one number";
		if (!/(?=.*[@$!%*?&])/.test(value))
			return "Password must contain at least one special character";
		return true;
	};

	const onSubmit: SubmitHandler<FormValues> = (_, event) => {
		console.log("Login Form submitted"); // Log form submission
		const formData = new FormData(event?.target);
		console.log("Login Form data on submit:", formData); // Log form data on submit
		submit(formData, {
			method: "POST",
			action: location.pathname,
			encType: "multipart/form-data",
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => {
			console.log("Toggling password visibility:", !prevState); // Log visibility toggle
			return !prevState;
		});
	};

	return (
		<article className='flex flex-col items-center px-6 py-12 text-center'>
			<h1
				className={`mt-8 font-serif text-xl text-center ${
					enabled ? "text-white" : "text-gray-900"
				}`}>
				LOGIN
			</h1>
			<form
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				className='mt-12 space-y-8 md:w-[19rem] flex flex-col items-center'>
				{/* Email Input */}
				<div className='relative'>
					<label
						htmlFor='email'
						className={`absolute inline-block px-2 text-xs font-light -top-2 left-4 ${
							enabled ? "bg-black text-white" : "text-gray-800 bg-white"
						}`}>
						E-Mail
					</label>
					<input
						autoFocus
						autoComplete='off'
						id='email'
						type='email'
						className={`w-[17rem] rounded-[3px] py-4 px-6 ring-[2.5px] ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600 sm:leading-6 ${
							enabled
								? "bg-black border-white text-white placeholder:text-gray-500"
								: "bg-white border-black text-black placeholder:text-gray-500"
						}`}
						placeholder='me@gmail.com'
						aria-invalid={errors.email ? "true" : "false"}
						{...register("email", {
							required: "Please enter an email",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email format",
							},
						})}
					/>
					{errors.email && (
						<p className='w-full py-2 text-sm text-white bg-black rounded-md dark:text-black dark:bg-white rounded-bl-3xl rounded-br-3xl'>
							{errors.email?.message}
						</p>
					)}
				</div>

				{/* Password Input with Show/Hide Toggle */}
				<div className='relative flex flex-col items-center'>
					<label
						htmlFor='password'
						className={`z-10 absolute inline-block px-2 text-xs font-light -top-2 left-4 ${
							enabled ? "bg-black text-white" : "text-gray-800 bg-white"
						}`}>
						Password
					</label>
					<div className='relative w-[17rem]'>
						<input
							autoComplete='off'
							id='password'
							type={showPassword ? "text" : "password"}
							className={`w-full rounded-[3px] py-4 px-6 ring-[2.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
								enabled
									? "bg-black border-white text-white placeholder:text-gray-500"
									: "bg-white border-black text-black placeholder:text-gray-500"
							}`}
							placeholder='password'
							aria-invalid={errors.password ? "true" : "false"}
							{...register("password", {
								required: {
									value: true,
									message: "Please enter a password",
								},
								validate: validatePassword,
							})}
						/>
						{errors.password && (
							<p className='mt-1 text-sm text-red-500'>
								{errors.password.message}
							</p>
						)}
						<button
							type='button'
							onClick={togglePasswordVisibility}
							className='absolute inset-y-0 text-gray-500 right-4 hover:text-gray-700 focus:outline-none'>
							<img
								src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
								alt={showPassword ? "Hide password" : "Show password"}
							/>
						</button>
					</div>
					{errors.password && (
						<p className='max-w-[17rem] w-full px-4 py-2 mb-8 text-sm text-white bg-black rounded-md dark:text-black dark:bg-white rounded-bl-3xl rounded-br-3xl'>
							{errors.password?.message}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<CustomButton
					type='submit'
					classes={`px-3 uppercase text-md py-3 rounded-tr-none rounded-bl-none rounded-2xl font-medium leading-6 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
						enabled
							? "border-3 border-white text-white shadow-custom-view-dark-lg text-black bg-black hover:text-gray-700 hover:bg-gray-50"
							: "text-black border-3 border-black hover:bg-gray-100 active:bg-gray-100 active:text-black hover:text-gray-700 shadow-custom-view-lg bg-white"
					}`}
					text={isSubmitting ? "Logging in..." : "Enter Memories Portal"}
					disabled={isSubmitting}
				/>
			</form>
			<div
				className={`flex justify-center gap-2 text-sm mt-28  ${
					enabled ? "text-white" : "text-black"
				}`}>
				Not a fan yet?{" "}
				<p className='font-semibold hover:text-gray-500'>
					<Link
						to='/register'
						className='px-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
						Register <span className='underline'>here!</span>
					</Link>
				</p>
			</div>

			{/* Overlay for messages */}
			{actionData?.successMessage && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 dark:bg-white dark:bg-opacity-70'>
					<div className='z-10 2xl:w-72 w-64 p-6 bg-white rounded-[6rem] relative rounded-tr-lg shadow-lg min-h-96 dark:bg-black'>
						<h2 className='pt-20 text-2xl font-black leading-10 text-center text-black uppercase dark:text-white'>
							{actionData.successMessage}
						</h2>
					</div>
				</div>
			)}

			{actionData?.errorMessage && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 dark:bg-white dark:bg-opacity-70'>
					<div className='z-10 2xl:w-72 w-64 p-6 bg-white rounded-[6rem] relative rounded-tr-lg shadow-lg min-h-96 dark:bg-black'>
						<h2 className='pt-20 text-2xl font-black text-center text-black uppercase dark:text-white'>
							<span className='text-red-600 '>Error</span>
							<br />
							<br />
							{actionData.errorMessage}
						</h2>
					</div>
				</div>
			)}
		</article>
	);
};

export default Login;
