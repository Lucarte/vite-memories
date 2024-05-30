const NotFound = () => {
	return (
		<div className='mt-[30%] flex flex-col gap-10'>
			<h1 className='text-7xl ml-4'>404</h1>
			<p className='text-3xl ml-12'>
				SOM <span>ETHING</span>
			</p>
			<p className='text-3xl ml-28'>
				UN <span>EXPECTED</span>
			</p>
			<p className='text-3xl ml-2'>
				HAPP <span>ENED</span>
			</p>

			<button>
				<a href='#'>
					Return <span className='underline font-bold'>HOME</span>
				</a>
			</button>
		</div>
	);
};

export default NotFound;
