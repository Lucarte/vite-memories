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

// HOC
import FooterWithTheme from "./HOC/FooterWithTheme";

// LAYOUTS
import RootLayout, { loader as rootLoader } from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import GabriellaLayout, {
	loader as gabriellasLoader,
} from "./layouts/GabriellaLayout";
import PabloLayout, { loader as pablosLoader } from "./layouts/PabloLayout";
import BothLayout, { loader as brunnisLoader } from "./layouts/BothLayout";

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
import { action as footerAction } from "./partials/Footer";
import SingleMemory, {
	loader as singleMemoryLoader,
} from "./components/SingleMemory";
import GabIntro from "./pages/GabIntro";
import PabloIntro from "./pages/PabloIntro";
import Both, { loader as bothMemoriesloader } from "./pages/Both";
import SingleFan, { loader as singleFanLoader } from "./pages/SingleFan";
import TitleList, { loader as titleListLoader } from "./pages/TitleList";
import SearchResultsPage from "./pages/SearchResultsPage";
import SingleMemoryXL from "./components/SingleMemoryXL";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={<RootLayout />}
				errorElement={<RootError />}
				loader={rootLoader}>
				<Route
					path='/logout'
					element={<FooterWithTheme />}
					action={footerAction}
				/>
				<Route path='/search' element={<SearchResultsPage />} />
				<Route
					path='/memories/title/:title'
					element={<SingleMemory />}
					loader={singleMemoryLoader}
				/>
				<Route
					path='/memories/title/:title'
					element={<SingleMemoryXL />}
					loader={singleMemoryLoader}
				/>

				{/* Not Found */}
				<Route path='*' element={<NotFound />} loader={rootLoader} />
			</Route>

			{/* HOME & all pages needing simpler header */}
			<Route path='/' element={<HomeLayout />} errorElement={<RootError />}>
				<Route index element={<Home />} />
				<Route path='/login' element={<Login />} action={loginAction} />
				<Route
					path='/register'
					element={<Registration />}
					action={registerAction}
				/>
				<Route
					path='/title-list'
					element={<TitleList />}
					loader={titleListLoader}
				/>
				<Route path='/fans' element={<Fans />} loader={fansLoader} />
				<Route
					path='/fan/:id'
					element={<SingleFan />}
					loader={singleFanLoader}
				/>
				{/* Admin Routes */}
				<Route
					path='/memory/create'
					element={<NewMemory />}
					loader={newMemoryFormLoader}
					action={createMemoryAction}
				/>
			</Route>

			{/* BRUNNIS LAYOUT  aka "md + sizes" */}
			<Route
				path='/'
				element={<BothLayout />}
				errorElement={<RootError />}
				loader={brunnisLoader}>
				<Route
					path='/brunnis/memories'
					element={<Both />}
					loader={bothMemoriesloader}
				/>
				<Route
					path='/gabriella/memories'
					element={<Gabriella />}
					loader={gabriellaMemoriesLoader}
				/>
				<Route
					path='/pablo/memories'
					element={<Pablo />}
					loader={pabloMemoriesLoader}
				/>
				<Route
					path='/memories'
					element={<Memories />}
					loader={memoriesLoader}
					action={memoriesAction}
				/>
			</Route>

			{/* PABLOS LAYOUT */}
			<Route
				path='/'
				element={<PabloLayout />}
				errorElement={<RootError />}
				loader={pablosLoader}>
				<Route path='/pablo' element={<PabloIntro />} />
			</Route>

			{/* GABIS LAYOUT */}
			<Route
				path='/'
				element={<GabriellaLayout />}
				errorElement={<RootError />}
				loader={gabriellasLoader}>
				<Route path='/gabriella' element={<GabIntro />} />
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
