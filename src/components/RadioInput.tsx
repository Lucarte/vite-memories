import React from "react";
import { UseFormRegister } from "react-hook-form";

interface OptionProps {
	id: string;
	name: string;
}

interface RadioInputProps {
	register: UseFormRegister<{ kid: string }>; // Register expects 'kid' field
	options: OptionProps[];
}

const RadioInput: React.FC<RadioInputProps> = ({ register, options }) => {
	return (
		<fieldset className='mt-8'>
			<legend className='text-sm font-semibold leading-6 text-left text-gray-900'>
				for...
			</legend>
			<div className='mt-3 space-y-3'>
				{options.map((option) => (
					<div key={option.id} className='flex items-center'>
						<input
							id={option.id}
							{...register("kid")}
							type='radio'
							value={option.name}
							className='w-4 h-4 text-black border-gray-300 focus:ring-orange-600'
						/>
						<label
							htmlFor={option.id}
							className='block ml-3 text-sm font-medium leading-6 text-gray-900'>
							{option.name}
						</label>
					</div>
				))}
			</div>
		</fieldset>
	);
};

export default RadioInput;
