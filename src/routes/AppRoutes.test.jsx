import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { jest } from '@jest/globals';

await jest.unstable_mockModule("@/HumanChecker/HumanChecker", () => ({
  default: () => <div data-testid="humanchecker-mock">HumanChecker Mock</div>,
}));

const { default: AppRoutes } = await import("@/routes/AppRoutes");

test("renders HumanChecker component at root route", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByTestId("humanchecker-mock")).toBeInTheDocument();
});