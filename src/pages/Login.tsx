import React, { FormEvent, useState } from "react";
import http from "../utils/http";
import { UserData } from "../types/UserData";

// const [page, setPage] = useState("register");
// const [userData, setUserData] = useState<UserData | null>(null);

const Login = (props: {
	setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}) => {
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

			props.setUserData(response.data);
		} catch {
			//
		}
	};
	return (
		<>
			{/* MAKE SURE THIS HAS YOUR LOGIN REQUS.  */}
			<div>Login</div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<input type='submit' value='Register' />
			</form>
			{/* link to registration !!! MUST GO IN THE LOGIN, NOT HERE :)) */}
			{/* <p className='mt-10 text-center text-sm text-gray-900'>
						Not a fan yet?{" "}
						<a
							href='#'
							className='font-semibold leading-6 text-gray-900 hover:text-gray-500'>
							Register <span className='underline'>here!</span>
						</a>
					</p> */}
		</>
	);
};

export default Login;
