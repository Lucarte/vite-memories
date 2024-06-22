import http from "../utils/http";
import CustomButton from "../components/CustomButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	email: string;
	password: string;
};

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const { state } = useLocation();

	const form = useForm<FormValues>();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = form;

	// If a user comes from a private route, we send him back there after login in
	// If she clicked on login directly we send her home
	const { from = "/" } = state || {};

	// Takes place when all fields validate
	const onValid = async (data: FormValues) => {
		try {
			await http.get("/sanctum/csrf-cookie");
			const response = await http.post("/api/auth/login", data);
			const userData = response.data.fan;

			setAuth({
				...userData,
				isAdmin: userData.is_admin ?? false,
			});

			// Will make sure to take the user back fo priavte page he tried visiting
			navigate(from);

			// TO DO: Replace with modal
			alert("Going back in time, enjoy!");
			console.log("Logged In!");
		} catch (error) {
			console.error("Login failed:", error);
			setError("root", { type: "manual", message: "Login failed" });
		}
	};

	// If errors found
	const onInvalid: SubmitErrorHandler<FieldValues> = (errors) => {
		console.log("Errors in Form: ", errors);
	};

	return (
		<article className='flex flex-col items-center px-6 py-12 md:mt-28lg:px-8'>
			{/* <div className='flex flex-col px-6 py-12 md:mt-28 flex-0 lg:px-8'> */}
			{/* Title */}
			<h2 className='mt-8 font-serif text-xl text-center text-gray-900'>
				LOGIN
			</h2>
			{/* Form */}
			<form
				noValidate
				onSubmit={handleSubmit(onValid, onInvalid)}
				className='mt-12 space-y-8 w-[16rem] md:w-[19rem] flex flex-col
				items-center'>
				{/* E-mail */}
				<div className='relative'>
					<label
						htmlFor='email'
						className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						E-Mail
					</label>
					<input
						autoComplete='false'
						id='email'
						type='email'
						className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
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
				{/* Password from Component*/}
				<div className='relative'>
					<label
						htmlFor='password'
						className='absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4'>
						Password
					</label>
					<input
						id='password'
						className='block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
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
									"Passwort muss mindestens 8 Zeichen lang sein",
								lowercase: (value) =>
									/^(?=.*[a-z])/.test(value) ||
									"Passwort muss mindestens einen Kleinbuchstaben enthalten",
								uppercase: (value) =>
									/^(?=.*[A-Z])/.test(value) ||
									"Passwort muss mindestens einen Großbuchstaben enthalten",
								number: (value) =>
									/^(?=.*\d)/.test(value) ||
									"Passwort muss mindestens eine Zahl enthalten",
								specialChar: (value) =>
									/^(?=.*[@$!%*?&])/.test(value) ||
									"Passwort muss mindestens ein Sonderzeichen enthalten",
							},
						})}
					/>
					<p className='mt-2 text-sm text-orange-500'>
						{errors.password?.message}
					</p>
				</div>
				{/* Register Button */}
				<CustomButton
					type='submit'
					classes='rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
					text='Enter Memories Portal'
				/>{" "}
			</form>
			{/* link to registration ! */}
			<div className='flex justify-center gap-2 text-sm text-gray-900 mt-28'>
				Not a fan yet?{" "}
				<p
					// href=""
					className='font-semibold text-gray-900 hover:text-gray-500'>
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
