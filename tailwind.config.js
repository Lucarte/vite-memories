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
			minHeight: {
				"screen-with-border": "calc(100vh - 16px)",
			},
		},
	},
	plugins: [
		function ({ addBase }) {
			addBase({
				"input:-webkit-autofill, input:-webkit-autofill:focus": {
					transition: "background-color 600000s 0s, color 600000s 0s",
				},
				"input[data-autocompleted]": {
					backgroundColor: "transparent !important",
				},
			});
		},
	],
};
