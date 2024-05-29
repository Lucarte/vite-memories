const MenuBarsIcon = () => {
	return (
		<div className='relative w-6 h-6 flex flex-col items-end gap-1'>
			{/* Larger bar */}
			<div className='w-8 h-[.2em] bg-black rounded' />
			{/* Medium bar, thicker, slightly rotated */}
			<div className='w-6 h-[.2em] bg-black rounded transform rotate-[-5deg] mt-[1px]' />
			{/* Smallest bar, thicker, more rotated */}
			<div className='w-4 h-[.2em] bg-black rounded transform rotate-[-10deg]' />
		</div>
	);
};

export default MenuBarsIcon;
