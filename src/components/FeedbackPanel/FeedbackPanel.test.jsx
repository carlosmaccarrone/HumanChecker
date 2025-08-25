import FeedbackPanel from '@/components/FeedbackPanel/FeedbackPanel';
import { render, screen } from "@testing-library/react";
import { jest } from '@jest/globals';
import React from "react";

describe("FeedbackPanel component", () => {  
  test("renders prediction and feedback when confidence >= 60", () => {
    const prediction = { shape: "Triangle", confidence: 80 };
    render(<FeedbackPanel prediction={prediction} feedback="Correct!" currentShape="Triangle" />);
    expect(screen.getByText(/Prediction/i)).toBeInTheDocument();
    expect(screen.getByText(/Triangle/i)).toBeInTheDocument();
    expect(screen.getByText(/80%/i)).toBeInTheDocument();
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  test("does not show prediction if confidence < 60 and shape !== currentShape", () => {
    const prediction = { shape: "Square", confidence: 50 };
    render(<FeedbackPanel prediction={prediction} feedback="Try again" currentShape="Circle" />);
    expect(screen.queryByText(/Prediction/i)).toBeNull();
    expect(screen.getByText(/Try again/i)).toBeInTheDocument();
  });
});