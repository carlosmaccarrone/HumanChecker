import { render, screen, fireEvent } from "@testing-library/react";
import Canvas from '@/components/Canvas/Canvas';
import { jest } from '@jest/globals';
import React from "react";

describe("Canvas component tests", () => {
  const mockStartDrawing = jest.fn();

  test("renders canvas element", () => {
    const canvasRef = React.createRef(); // 🔹 ref real
    render(<Canvas canvasRef={canvasRef} startDrawing={mockStartDrawing} />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas).toBeTruthy();
  });

  test("canvas has correct dimensions", () => {
    const canvasRef = React.createRef();
    render(<Canvas canvasRef={canvasRef} startDrawing={mockStartDrawing} />);
    const canvas = screen.getByTestId("canvas");
    expect(canvas.width).toBe(300);
    expect(canvas.height).toBe(300);
  });

  test("calls startDrawing on mouse down", () => {
    const canvasRef = React.createRef();
    render(<Canvas canvasRef={canvasRef} startDrawing={mockStartDrawing} />);
    const canvas = screen.getByTestId("canvas");
    fireEvent.mouseDown(canvas);
    expect(mockStartDrawing).toHaveBeenCalled();
  });
});