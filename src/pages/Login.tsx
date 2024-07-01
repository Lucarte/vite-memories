import CustomButton from "../components/CustomButton";
import {
	ActionFunction,
	Link,
	redirect,
	useActionData,
	useLocation,
	useSubmit,
} from "react-router-dom";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useTheme } from "../context/ThemeContext";
import LightAndUpBtns from "../partials/LightAndUpBtns";
import { login } from "../utils/api";

type FormValues = {
	email: string;
	password: string;
};

// // TO DO: Replace with modal
// alert("Going back in time, enjoy!");

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	try {
		const data = await login(formData);
		console.log("Login successful: ", data);
		return redirect("/");
	} catch (error) {
		console.error("Login error:", error);
		return error;
	}
};

// type actionData = {
// 	error: string;
// 	message: string;
// };

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
	// const actionData = useActionData() as actionData | undefined;

	// useSubmit - wemm eine Navigation/Redirect strattfindet (erst eine Validierung)
	// Form (react router) - Standard Browser Verhalten
	// useFetcher - am häufigsten - hoch dynamische UIs

	// Takes place when all fields validate
	const onValid: SubmitHandler<FormValues> = (data, event) => {
		submit(data, {
			action: location.pathname,
			method: "POST",
		});
	};

	// If errors found
	const onInvalid: SubmitErrorHandler<FieldValues> = (errors) => {
		console.log("Errors in Form: ", errors);
	};

	return (
		<article className='flex flex-col items-center px-6 py-12 text-center md:mt-28lg:px-8'>
			<LightAndUpBtns />
			{/* Title */}
			<h2
				className={`${
					enabled ? "text-white" : "text-gray-900"
				}, 'mt-8 font-serif text-xl text-center'`}>
				LOGIN
			</h2>
			{/* Form */}
			<form
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit(onValid, onInvalid)}
				className='mt-12 space-y-8 w-[16rem] md:w-[19rem] flex flex-col
				items-center'>
				{/* E-mail */}
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
						} w-full rounded-[3px] py-4 px-6  shadow-sm ring-[2.5px] ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
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
					classes={`${
						enabled
							? "bg-white text-black hover:bg-gray-300"
							: "bg-black text-white hover:bg-gray-500"
					} rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-medium leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
					text='Enter Memories Portal'
				/>{" "}
				{/* {actionData && actionData.error ? <p>{actionData.error}</p> : null} */}
			</form>
			{/* link to registration ! */}
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
