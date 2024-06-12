import React, { FormEvent, useState } from "react";
import http from "../utils/http";
import { UserData } from "../types/UserData";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";

// const [page, setPage] = useState("register");
// const [userData, setUserData] = useState<UserData | null>(null);

// const Login = (props: {
// 	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
// }) => {
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await http.get("/sanctum/csrf-cookie");
			const response = await http.post("/api/auth/login", {
				email,
				password,
			});

			// props.setUserData(response.data);
		} catch {
			//
		}
	};
	return (
		<div className='flex flex-col items-center px-6 py-12 md:mt-28 flex-0 lg:px-8'>
			{/* Title */}
			<h2 className='mt-8 font-serif text-xl text-center text-gray-900'>
				LOGIN
			</h2>
			{/* Form */}
			<form
				className='mt-12 space-y-8 w-[16rem] md:w-[19rem]'
				onSubmit={handleSubmit}>
				{/* E-mail from Component*/}
				<div className='relative'>
					<InputBox
						label={{
							htmlFor: "email",
							text: "E-Mail",
							classes:
								"absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4",
						}}
						input={{
							type: "email",
							classes:
								"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
							name: "email",
							id: "email",
							placeholder: "me@gmail.com",
							value: email,
							onChange(e) {
								setEmail(e.target.value);
							},
						}}
					/>
				</div>
				{/* Password from Component*/}
				<div className='relative'>
					<InputBox
						label={{
							htmlFor: "password",
							classes:
								"absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4",
							text: "Password",
						}}
						input={{
							type: "password",
							name: "password",
							id: "password",
							classes:
								"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
							placeholder: "1ShortJoke!",
							value: password,
							onChange: (e) => {
								setPassword(e.target.value);
							},
						}}
					/>
				</div>
				{/* Register Button */}
				<CustomButton
					type='submit'
					classes='rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
					text='Enter Memories Portal'
				/>{" "}
			</form>
			{/* link to registration ! */}
			<p className='text-sm text-center text-gray-900 mt-28'>
				Not a fan yet?{" "}
				<a
					href='#'
					className='font-semibold leading-6 text-gray-900 hover:text-gray-500'>
					Register <span className='underline'>here!</span>
				</a>
			</p>
		</div>
	);
};

export default Login;
