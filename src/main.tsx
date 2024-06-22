import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

// CONTEXT
import { ThemeProvider } from "./context/ThemeContext";

// LAYOUTS
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import AdminLayout from "./layouts/AdminLayout";

// PAGES
import Login from "./pages/Login";
import RootError from "./errors/RootError";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
// import Memories, { loader as memoriesLoader } from "./pages/Memories";
import AuthProvider from "./context/AuthProvider";
import Memories from "./pages/Memories";
import Pablo from "./pages/Pablo";
import Gabriella from "./pages/Gabriella";
import Fans from "./pages/Fans";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />} errorElement={<RootError />}>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />

				{/* Private Routes */}
				<Route element={<PrivateLayout />}>
					<Route path='/gabriella' element={<Gabriella />} />
					<Route path='/pablo' element={<Pablo />} />
					<Route
						path='/memories'
						// loader={memoriesLoader}
						element={<Memories />}></Route>
					<Route
						path='/memories/:kid'
						// loader={memoriesLoader}
						element={<Memories />}></Route>
				</Route>

				{/* Admin Routes */}
				<Route element={<AdminLayout />}>
					<Route path='/fans' element={<Fans />} />
				</Route>

				{/* Not Found */}
				<Route path='*' element={<NotFound />} />
			</Route>

			<Route path='/' element={<HomeLayout />} errorElement={<RootError />}>
				<Route index element={<Home />} />
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
);
