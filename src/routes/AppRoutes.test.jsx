import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { jest } from '@jest/globals';

await jest.unstable_mockModule("@/HumanChecker/HumanChecker", () => ({
	default: () => <div data-testid="humanchecker-mock">HumanChecker Mock</div>,
}));

const { default: AppRoutes } = await import("@/routes/AppRoutes");

describe("Home Tests", () => {
	let consoleErrorSpy;
	let consoleWarnSpy;

	beforeAll(() => {
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
	});

	afterAll(() => {
		consoleErrorSpy.mockRestore();
		consoleWarnSpy.mockRestore();
	});  

	test("renders HumanChecker component at root route", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<AppRoutes />
			</MemoryRouter>
		);

		expect(screen.getByTestId("humanchecker-mock")).toBeInTheDocument();
	});
});