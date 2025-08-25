import { render, screen } from "@testing-library/react";
import styles from "@/HumanChecker/HumanChecker.module.css";
import { jest } from '@jest/globals';

await jest.unstable_mockModule("@/contexts/HumanCheckerContext", () => ({
  useHumanChecker: () => ({
    currentShape: "Circle",
    canvasRef: { current: null },
    startDrawing: jest.fn(),
    handleCheck: jest.fn(),
    handleNext: jest.fn(),
    handleUndo: jest.fn(),
    handleRedo: jest.fn(),
    handleClear: jest.fn(),
    prediction: null,
    feedback: ""
  })
}));

await jest.unstable_mockModule("@/components/Prompt/Prompt", () => ({
  default: ({ currentShape }) => <div data-testid="prompt">{currentShape}</div>
}));
await jest.unstable_mockModule("@/components/Canvas/Canvas", () => ({
  default: () => <canvas data-testid="canvas" />
}));
await jest.unstable_mockModule("@/components/Buttons/Buttons", () => ({
  default: () => <div data-testid="buttons" />
}));
await jest.unstable_mockModule("@/components/FeedbackPanel/FeedbackPanel", () => ({
  default: () => <div data-testid="feedbackpanel" />
}));

const { default: HumanChecker } = await import("@/HumanChecker/HumanChecker");

test("smoke test: HumanChecker renders without crashing", () => {
  render(<HumanChecker />);
  
  expect(screen.getByTestId("prompt")).toBeInTheDocument();
  expect(screen.getByTestId("canvas")).toBeInTheDocument();
  expect(screen.getByTestId("buttons")).toBeInTheDocument();
  expect(screen.queryByTestId("feedbackpanel")).toBeNull();
});