import { FormEvent, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import http from "../utils/http";
import CustomButton from "./CustomButton";
import InputBox from "./InputBox";
import Dropdown from "./Dropdown";
import { handleFileUpload } from "../utils/FileUploadHelper";
import { handleDropdownChange } from "../utils/DropdownHelper";

const RegisterForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [relationshipToKid, setRelationshipToKid] = useState(
		"Choose Relationship"
	);
	const [terms, setTerms] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [avatarURL, setAvatarURL] = useState("");

	const handleButtonClick = () => {
		document.getElementById("hiddenFileInput")?.click();
	};

	// for the onSubmit inside the form tag
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Create FormData object
		const formData = new FormData();
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("passwordConfirmation", passwordConfirmation);
		formData.append("relationshipToKid", relationshipToKid);
		formData.append("terms", terms ? "1" : "0"); // Convert boolean to number

		if (uploadedFile) {
			formData.append("avatar_path", uploadedFile);
		}

		try {
			await http.get("/sanctum/csrf-cookie");
			const response = await http.post("api/auth/register", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};

	return (
		<form
			className='mt-4 space-y-10'
			action='#'
			// method='POST'
			onSubmit={handleSubmit}>
			{/* Avatar */}
			<div className='flex flex-col items-center gap-y-4'>
				{avatarURL ? (
					<img
						src={avatarURL}
						alt='User avatar'
						className='object-cover w-12 h-12 rounded-full'
					/>
				) : (
					<UserCircleIcon
						className='w-12 h-12 text-gray-300'
						aria-hidden='true'
					/>
				)}
				<div className='relative inline-block'>
					<CustomButton
						onClick={handleButtonClick}
						type='button'
						text='Upload a profile foto'
						classes='relative rounded-[3px] bg-white px-2 py-1 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					/>
					<input
						id='hiddenFileInput'
						type='file'
						// 'handleFileUpload' comes from 'FileUploadHelper'
						onChange={(e) => handleFileUpload(e, setUploadedFile, setAvatarURL)}
						// pointer only works when 'hidden', but the btn functionality only on 'opacity-0'
						className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
					/>
				</div>
				{uploadedFile && <p>Uploaded file: {uploadedFile.name}</p>}
			</div>
			{/* First Name  from Component*/}
			<div className='relative'>
				<InputBox
					label={{
						htmlFor: "firstName",
						classes:
							"absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4",
						text: "First Name",
					}}
					input={{
						type: "text",
						name: "firstName",
						id: "firstName",
						classes:
							"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
						placeholder: "Mariana",
						value: firstName,
						onChange: (e) => {
							setFirstName(e.target.value);
						},
					}}
				/>
			</div>
			{/* Last Name  from Component*/}
			<div className='relative'>
				<InputBox
					label={{
						htmlFor: "lastName",
						classes:
							"absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4",
						text: "Last Name",
					}}
					input={{
						type: "text",
						name: "lastName",
						id: "lastName",
						classes:
							"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
						placeholder: "Lucht",
						value: lastName,
						onChange: (e) => {
							setLastName(e.target.value);
						},
					}}
				/>
			</div>
			{/* E-Mail from Component*/}
			<div className='relative'>
				<InputBox
					label={{
						htmlFor: "email",
						classes:
							"absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4",
						text: "E-Mail",
					}}
					input={{
						type: "email",
						name: "email",
						id: "email",
						classes:
							"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
						placeholder: "me@gmail.com",
						value: email,
						onChange: (e) => {
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
			{/* Password Confirmation from Component*/}
			<div className='relative'>
				<InputBox
					label={{
						htmlFor: "passwordConfirmation",
						classes:
							"absolute inline-block px-2 text-xs font-light text-gray-800 bg-white -top-2 left-4",
						text: "Password Confirmation",
					}}
					input={{
						type: "password",
						name: "passwordConfirmation",
						id: "passwordConfirmation",
						classes:
							"block w-full rounded-[3px] border-0 py-4 px-6 text-gray-900 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
						placeholder: "SameShortJoke!",
						value: passwordConfirmation,
						onChange: (e) => {
							setPasswordConfirmation(e.target.value);
						},
					}}
				/>
			</div>
			{/* Relationship to kid from Component*/}
			<Dropdown
				select={{
					id: "relationshipToKid",
					name: "relationshipToKid",
					value: relationshipToKid,
					classes:
						"block w-full rounded-[3px] font-light border-0 py-2 px-6 bg-gray-100 text-gray-500 shadow-sm ring-[2.5px] ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6",
					// 'handleDropdownChange' comes from 'DropdownHelper'
					onChange: handleDropdownChange(setRelationshipToKid),
				}}
				options={["Choose Relationship", "Family", "Friend", "Teacher"]}
			/>
			{/* Terms */}
			<InputBox
				classes='flex relative items-center h-6 gap-x-3 justify-center'
				input={{
					type: "checkbox",
					name: "terms",
					id: "terms",
					classes:
						"w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-orange-600",
					onChange: (e) => setTerms(e.target.checked),
				}}
				label={{
					htmlFor: "terms",
					classes: "text-black text-sm",
					text: "Accept the ",
					children: (
						<span className='underline cursor-pointer hover:text-gray-600'>
							Terms & Conditions
						</span>
					),
				}}
			/>
			{/* Register Button */}
			<CustomButton
				type='submit'
				classes='rounded-bl-2xl rounded-tr-2xl bg-gray-900 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
				text='Register'
			/>{" "}
		</form>
	);
};

export default RegisterForm;
