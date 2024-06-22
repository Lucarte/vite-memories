/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				titles: ['"Barlow Condensed"', "sans-serif"],
				text: ['"Nunito"', "sans-serif"],
				categories: ['"Anek Latin"', "sans-serif"],
			},
			letterSpacing: {
				wide: "0.25em", // Custom letter-spacing value, then use 'tracking-wide'
			},
		},
	},
	plugins: [forms],
};
