import { render, screen, userEvent } from "../utils/testUtils";
import { ThemeProvider } from "../context/ThemeContext";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

// Definiere die Routen für den RouterProvider
const routes = [
	{
		path: "/login",
		element: <Login />,
	},
];

const router = createMemoryRouter(routes, {
	initialEntries: ["/login"],
});

describe("Component: Login", () => {
	it("should render Login correctly", () => {
		render(
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
		const emailInput = screen.getByLabelText(/e-mail/i);
		expect(emailInput).toBeInTheDocument();

		const passwordInput = screen.getByLabelText(/password/i);
		expect(passwordInput).toBeInTheDocument();

		const submitButton = screen.getByRole("button", {
			name: /enter memories portal/i,
		});
		expect(submitButton).toBeInTheDocument();
	});

	// THIS ONE WORKS BUT NOT COMBINED WITH OTHER ONES. JUST THE ONE ABOVE
	it("should show email validation errors with invalid data", async () => {
		render(
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		);

		const emailInput = screen.getByLabelText(/e-mail/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", {
			name: /enter memories portal/i,
		});

		await userEvent.type(emailInput, "invalid-email");
		await userEvent.type(passwordInput, "short");

		await userEvent.click(submitButton);

		const emailError = await screen.findByText(/invalid email format/i);
		expect(emailError).toBeInTheDocument();

		const passwordError = await screen.findByText(
			/password must be at least 8 characters long/i
		);
		expect(passwordError).toBeInTheDocument();
	});
});
