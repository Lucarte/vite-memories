import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

type ThemeContextType = {
	enabled: boolean;
	setEnabled: (value: boolean) => void;
};

type ThemeProviderProps = {
	children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [enabled, setEnabled] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? savedTheme === "dark" : false;
	});

	useEffect(() => {
		if (enabled) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [enabled]);

	return (
		<ThemeContext.Provider value={{ enabled, setEnabled }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
