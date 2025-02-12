import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Filter } from "./Filter";

describe("Filter", () => {
  it("should render with initial empty input value", () => {
    render(<Filter onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Title Filter");
    expect(inputElement.value).toBe(""); // Initially should be empty
  });

  it("should call onChange prop when text is typed", () => {
    const mockOnChange = jest.fn();
    render(<Filter onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Title Filter");

    fireEvent.change(inputElement, { target: { value: "Test text" } });

    // Check if the mock function was called
    expect(mockOnChange).toHaveBeenCalledWith("Test text");
  });

  it("should update the input value when typing", () => {
    render(<Filter onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Title Filter");

    // Type into the input
    fireEvent.change(inputElement, { target: { value: "New value" } });

    // Check if the value of input is updated
    expect(inputElement.value).toBe("New value");
  });

  it("should maintain the input value after change", () => {
    render(<Filter onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Title Filter");

    fireEvent.change(inputElement, { target: { value: "Another text" } });

    // Check if the state reflects the input value
    expect(inputElement.value).toBe("Another text");
  });
});
