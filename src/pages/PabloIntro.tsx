import { useEffect, useState } from "react";
import PabloIntroLaptopPlus from "../components/PabloIntroLaptopPlus";
import PabloIntroMobile from "../components/PabloIntroMobile";

const PabloIntro = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		// first check screen size
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 1023);
		};
		// check initial size
		checkScreenSize();

		window.addEventListener("resize", checkScreenSize);

		// cleanup function
		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return (
		<div className='h-screen overflow-hidden'>
			{isMobile ? <PabloIntroMobile /> : <PabloIntroLaptopPlus />}
		</div>
	);
};

export default PabloIntro;
