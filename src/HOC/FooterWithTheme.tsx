import { useTheme } from "../context/ThemeContext";
import Footer from "../partials/Footer";
import { FooterProps } from "../types/FooterProps";

const FooterWithTheme = ({ customStyle }: FooterProps) => {
	const { enabled } = useTheme();
	return <Footer enabled={enabled} customStyle={customStyle} />;
};

export default FooterWithTheme;
