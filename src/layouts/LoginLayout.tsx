/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import Header from "../partials/Header";
import LoadingLayout from "./LoadingLayout";

const LoginLayout = () => {
	return (
		<>
			<LoadingLayout>
				<>
					<Header />
					<main className=''>
						<Outlet />
					</main>
				</>
			</LoadingLayout>
		</>
	);
};

export default LoginLayout;
