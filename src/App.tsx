import Registration from "./pages/Registration";
import "./App.css";
import Header from "./partials/Header";

const App = () => {
	console.log(
		import.meta.env.VITE_MEILISEARCH_HOST,
		import.meta.env.VITE_MEILISEARCH_API_KEY
	);
	return (
		<div className=''>
			<Header />
			<Registration />
		</div>
	);
};

export default App;
