/* eslint-disable react-refresh/only-export-components */
import CustomButton from "../components/CustomButton";
import {
	ActionFunction,
	Link,
	useLocation,
	useSubmit,
	useNavigate,
	useActionData,
} from "react-router-dom";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { useTheme } from "../context/ThemeContext";
import { login } from "../utils/api";
import DarkModeBtn from "../partials/DarkModeBtn";
import { useEffect } from "react";
import { json } from "react-router-dom";

type FormValues = {
	email: string;
	password: string;
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	try {
		await login(formData);
		return json(
			{
				successMessage: "You can now go down memory lane!",
				redirectTo: "/memories",
			},
			{ status: 200 }
		);
	} catch (error) {
		return json(
			{
				errorMessage: `Invalid credentials <br> Only registered users can login`,
			},
			{ status: 400 }
		);
	}
};

const Login = () => {
	const { enabled } = useTheme();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const submit = useSubmit();
	const location = useLocation();
	const actionData = useActionData() as {
		successMessage?: string;
		errorMessage?: string;
		redirectTo?: string;
	};
	const navigate = useNavigate();

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
		// Handle successful login
		if (actionData?.successMessage && actionData?.redirectTo) {
			setTimeout(() => {
				if (actionData.redirectTo) {
					navigate(actionData.redirectTo);
				}
			}, 3000);
		}

		// Handle login error
		if (actionData?.errorMessage) {
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		}
	}, [actionData, navigate]);

	return (
		<article className='flex flex-col items-center px-6 py-12 text-center md:mt-28 lg:px-8'>
			<DarkModeBtn />
			<h1
				className={`mt-8 font-serif text-xl text-center ${
					enabled ? "text-white" : "text-gray-900"
				}`}>
				LOGIN
			</h1>
			<form
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(onValid, onInvalid)}
				className='mt-12 space-y-8 w-[16rem] md:w-[19rem] flex flex-col items-center'>
				<div className='relative'>
					<label
						htmlFor='email'
						className={`absolute inline-block px-2 text-xs font-light -top-2 left-4 ${
							enabled ? "bg-black text-white" : "text-gray-800 bg-white"
						}`}>
						E-Mail
					</label>
					<input
						autoComplete='false'
						id='email'
						type='email'
						className={`w-full rounded-[3px] py-4 px-6 shadow-sm ring-[2.5px] ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
							enabled
								? "bg-black border-white text-white placeholder:text-gray-500 focus:ring-gray-400"
								: "bg-white border-black text-black placeholder:text-gray-500 focus:ring-orange-600"
						}`}
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
						className={`absolute inline-block px-2 text-xs font-light -top-2 left-4 ${
							enabled ? "bg-black text-white" : "text-gray-800 bg-white"
						}`}>
						Password
					</label>
					<input
						id='password'
						className={`w-full rounded-[3px] py-4 px-6 shadow-sm ring-[2.5px] ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
							enabled
								? "bg-black border-white text-white placeholder:text-gray-500 focus:ring-gray-400"
								: "bg-white border-black text-black placeholder:text-gray-500 focus:ring-orange-600"
						}`}
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
					classes={`rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-medium leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
						enabled
							? "bg-white text-black hover:bg-gray-300"
							: "bg-black text-white hover:bg-gray-500"
					}`}
					text='Enter Memories Portal'
				/>
			</form>
			<div
				className={`flex justify-center gap-2 text-sm mt-28 ${
					enabled ? "text-white" : "text-black"
				}`}>
				Not a fan yet?{" "}
				<p className='font-semibold hover:text-gray-500'>
					<Link to='/register'>
						Register <span className='underline'>here!</span>
					</Link>
				</p>
			</div>

			{/* Overlay for messages */}
			{actionData?.successMessage && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='w-56 p-8 text-lg font-extrabold uppercase bg-white rounded-tr-lg shadow-lg rounded-3xl font-titles'>
						<p className='text-black'>{actionData.successMessage}</p>
					</div>
				</div>
			)}

			{actionData?.errorMessage && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<div className='w-56 p-8 text-lg font-extrabold uppercase bg-white rounded-tr-lg shadow-lg rounded-3xl font-titles'>
						{actionData.errorMessage.split("<br>").map((line, index) => (
							<p key={index} className='my-4 text-red-500'>
								{line}
							</p>
						))}
					</div>
				</div>
			)}
		</article>
	);
};

export default Login;
