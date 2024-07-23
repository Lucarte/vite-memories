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
import RootLayout, { loader as rootLoader } from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";

// PAGES
import Login, { action as loginAction } from "./pages/Login";
import RootError from "./errors/RootError";
import Registration, { action as registerAction } from "./pages/Registration";
import Home from "./pages/Home";
import Memories, {
	loader as memoriesLoader,
	action as memoriesAction,
} from "./pages/Memories";
import Pablo, { loader as pabloMemoriesLoader } from "./pages/Pablo";
import Gabriella, {
	loader as gabriellaMemoriesLoader,
} from "./pages/Gabriella";
import NewMemory, {
	action as createMemoryAction,
	loader as newMemoryFormLoader,
} from "./pages/NewMemory";
import Fans, { loader as fansLoader } from "./pages/Fans";
import NotFound from "./pages/NotFound";
import Footer, { action as footerAction } from "./partials/Footer";
import SingleMemory, {
	loader as singleMemoryLoader,
} from "./components/SingleMemory";
import GabIntro from "./pages/GabIntro";
import PabloIntro from "./pages/PabloIntro";
import Both, { loader as bothMemoriesloader } from "./pages/Both";
import BothIntro from "./pages/BothIntro";
import SingleFan, { loader as singleFanLoader } from "./pages/SingleFan";
import TitleList, { loader as titleListLoader } from "./pages/TitleList";
import GabriellaLayout, {
	loader as gabriellasLoader,
} from "./layouts/GabriellaLayout";
import PabloLayout, { loader as pablosLoader } from "./layouts/PabloLayout";
import BothLayout, { loader as brunnisLoader } from "./layouts/BothLayout";
import LoginLayout from "./layouts/LoginLayout";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={<RootLayout />}
				errorElement={<RootError />}
				loader={rootLoader}>
				<Route
					path='/register'
					element={<Registration />}
					action={registerAction}
				/>
				<Route path='/logout' element={<Footer />} action={footerAction} />
				<Route
					path='/memories'
					element={<Memories />}
					loader={memoriesLoader}
					action={memoriesAction}
				/>
				<Route
					path='/memories/title/:title'
					element={<SingleMemory />}
					loader={singleMemoryLoader}
				/>
				<Route
					path='/title-list'
					element={<TitleList />}
					loader={titleListLoader}
				/>
				{/* Admin Routes */}
				<Route
					path='/memory/create'
					element={<NewMemory />}
					loader={newMemoryFormLoader}
					action={createMemoryAction}
				/>
				<Route path='/fans' element={<Fans />} loader={fansLoader} />
				<Route
					path='/fan/:id'
					element={<SingleFan />}
					loader={singleFanLoader}
				/>

				{/* Not Found */}
				<Route path='*' element={<NotFound />} loader={rootLoader} />
			</Route>

			{/* LOGIN LAYOUT (OHNE FOOTER) */}
			<Route path='/' element={<LoginLayout />} errorElement={<RootError />}>
				<Route path='/login' element={<Login />} action={loginAction} />
			</Route>

			{/* HOME LAYOUT */}
			<Route path='/' element={<HomeLayout />} errorElement={<RootError />}>
				<Route index element={<Home />} />
			</Route>

			{/* BRUNNIS LAYOUT */}
			<Route
				path='/'
				element={<BothLayout />}
				errorElement={<RootError />}
				loader={brunnisLoader}>
				<Route path='/brunnis' element={<BothIntro />} />
				<Route
					path='/brunnis/memories'
					element={<Both />}
					loader={bothMemoriesloader}
				/>
			</Route>

			{/* PABLOS LAYOUT */}
			<Route
				path='/'
				element={<PabloLayout />}
				errorElement={<RootError />}
				loader={pablosLoader}>
				<Route path='/pablo' element={<PabloIntro />} />
				<Route
					path='/pablo/memories'
					element={<Pablo />}
					loader={pabloMemoriesLoader}
				/>
			</Route>

			{/* GABIS LAYOUT */}
			<Route
				path='/'
				element={<GabriellaLayout />}
				errorElement={<RootError />}
				loader={gabriellasLoader}>
				<Route path='/gabriella' element={<GabIntro />} />
				<Route
					path='/gabriella/memories'
					element={<Gabriella />}
					loader={gabriellaMemoriesLoader}
				/>
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<RouterProvider router={router}></RouterProvider>
		</ThemeProvider>
	</React.StrictMode>
);
