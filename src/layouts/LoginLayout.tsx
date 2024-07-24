/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import Header from "../partials/Header";
import LoadingLayout from "./LoadingLayout";
import DarkModeBtn from "../partials/DarkModeBtn";

const LoginLayout = () => {
	return (
		<>
			<LoadingLayout>
				<>
					<Header />
					<DarkModeBtn classes='bottom-8' />
					<main>
						<Outlet />
					</main>
				</>
			</LoadingLayout>
		</>
	);
};

export default LoginLayout;
