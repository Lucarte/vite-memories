import React from "react";
import { Link } from "react-router-dom";

const PabloIntro: React.FC = () => {
	return (
		<div className='flex flex-col items-center gap-6 p-6 text-center'>
			<h1 className='pt-4 pb-6 text-xl font-bold'>Pablo's Introduction</h1>
			<p>
				Welcome to Pablo's introduction page! Learn more about him and see his
				memories.
			</p>
			<Link
				to='/memories/kid/pablo'
				className='px-4 py-2 mt-4 font-bold text-white bg-gray-500 rounded hover:bg-blue-700'>
				View Pablo's Memories
			</Link>
		</div>
	);
};

export default PabloIntro;
