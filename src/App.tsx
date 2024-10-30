import Registration from "./pages/Registration";
import "./App.css";
import Header from "./partials/Header";
import { useEffect } from "react";

const App = () => {
	useEffect(() => {
		console.log(
			"VITE_MEILISEARCH_HOST:",
			import.meta.env.VITE_MEILISEARCH_HOST,
			"VITE_MEILISEARCH_API_KEY:",
			import.meta.env.VITE_MEILISEARCH_API_KEY
		);
	}, []);

	return (
		<div className=''>
			<Header />
			<Registration />
		</div>
	);
};

export default App;
