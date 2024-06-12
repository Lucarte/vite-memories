import Header from "./components/Header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useState } from "react";

import "./App.css";
import NewMemory from "./pages/NewMemory";

const App = () => {
	const [page, setPage] = useState("Registration");
	// const [page, setPage] = useState("Login");
	return (
		<div className=''>
			<Header />
			<Login />
			{/* <Registration /> */}
			{/* <NewMemory /> */}
			{/* {page === "Registration" ? <Registration /> : <Login />} */}
		</div>
	);
};

export default App;
