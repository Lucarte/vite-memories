const nameOptions = [
	{ id: "Both", name: "Both" },
	{ id: "Pablo", name: "Pablo" },
	{ id: "Gabriella", name: "Gabriella" },
];

const RadioInput = () => {
	return (
		<>
			<fieldset className='mt-8'>
				<legend className='text-sm font-semibold leading-6 text-left text-gray-900'>
					for...
				</legend>
				<div className='mt-3 space-y-3'>
					{nameOptions.map((nameOption) => (
						<div key={nameOption.id} className='flex items-center'>
							<input
								id={nameOption.id}
								name='notification-method'
								type='radio'
								defaultChecked={nameOption.id === "Both"}
								className='w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-600'
							/>
							<label
								htmlFor={nameOption.id}
								className='block ml-3 text-sm font-medium leading-6 text-gray-900'>
								{nameOption.name}
							</label>
						</div>
					))}
				</div>
			</fieldset>
		</>
	);
};

export default RadioInput;
