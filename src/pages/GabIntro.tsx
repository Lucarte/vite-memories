import { useEffect, useState } from "react";
import GabIntroLaptopPlus from "../components/GabIntroLaptopPlus";
import GabIntroMobile from "../components/GabIntroMobile";

const GabIntro = () => {
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

	return <>{isMobile ? <GabIntroMobile /> : <GabIntroLaptopPlus />}</>;
};

export default GabIntro;
