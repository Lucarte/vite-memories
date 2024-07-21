import { render, screen } from "../../src/utils/testUtils";
import CustomButton from "./CustomButton";

describe("Component: Button", () => {
	it("renders correctly", () => {
		render(<CustomButton text='Click me!' type='submit' />);
		// getBy bei einem existierendem Element
		// queryBy bei einem vorhandenem Element, jedoch nicht im (virtual) DOM
		// findBy bei asynchronen Operationen
		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
	});
});
