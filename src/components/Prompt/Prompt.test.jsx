import { render, screen } from "@testing-library/react";
import Prompt from "@/components/Prompt/Prompt";
import { jest } from '@jest/globals';
import React from "react";

describe("Prompt component", () => {
  test("renders prompt with current shape", () => {
    render(<Prompt currentShape="Circle" />);
    
    expect(screen.getByText(/Draw a:/i)).toBeInTheDocument();
    expect(screen.getByText("Circle")).toBeInTheDocument();
  });
});