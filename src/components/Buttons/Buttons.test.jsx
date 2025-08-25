import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from '@/components/Buttons/Buttons';
import { jest } from '@jest/globals';

describe("Buttons component tests", () => {
  const mockHandlers = {
    handleCheck: jest.fn(),
    handleNext: jest.fn(),
    handleUndo: jest.fn(),
    handleRedo: jest.fn(),
    handleClear: jest.fn(),
  };

  test("renders all buttons", () => {
    render(<Buttons {...mockHandlers} prediction={null} />);
    expect(screen.getByText("Check")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Undo")).toBeInTheDocument();
    expect(screen.getByText("Redo")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("calls handleNext when Next is clicked", () => {
    render(<Buttons {...mockHandlers} prediction={null} />);
    fireEvent.click(screen.getByText("Next"));
    expect(mockHandlers.handleNext).toHaveBeenCalled();
  });

  test("Check button is disabled when prediction exists", () => {
    render(<Buttons {...mockHandlers} prediction={{ shape: "Circle", confidence: 90 }} />);
    expect(screen.getByText("Check")).toBeDisabled();
  });
});