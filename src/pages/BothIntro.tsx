import React from "react";
import { Link } from "react-router-dom";

const BothIntro: React.FC = () => {
	return (
		<div className='flex flex-col items-center gap-6 p-6 text-center'>
			<h1 className='pt-4 pb-6 text-xl font-bold'>
				Gabriella & Pablo's Introduction
			</h1>
			<p>
				Welcome to the introduction page for Gabriella and Pablo! Learn more
				about them and see their memories.
			</p>
			<Link
				to='/memories/kid/both'
				className='px-4 py-2 mt-4 font-bold text-white bg-gray-500 rounded hover:bg-blue-700'>
				View Gabriella & Pablo's Memories
			</Link>
		</div>
	);
};

export default BothIntro;
