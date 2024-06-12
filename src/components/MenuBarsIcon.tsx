const MenuBarsIcon = () => {
	return (
		<div className='relative flex flex-col items-end w-6 h-6 gap-1 justify-normal '>
			{/* Larger bar */}
			<div className='w-8 h-[.2em] bg-black rounded pl-1' />
			{/* Medium bar, thicker, slightly rotated */}
			<div className='w-6 h-[.2em] bg-black rounded transform rotate-[-5deg] mt-[1px]' />
			{/* Smallest bar, thicker, more rotated */}
			<div className='w-4 h-[.2em] bg-black rounded transform rotate-[-10deg]' />
		</div>
	);
};

export default MenuBarsIcon;
