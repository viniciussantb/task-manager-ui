import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
const sampleData = [
  {
    id: 1,
    title: "Test Task 1",
    description: "Description 1",
    dueDate: "2025-02-12",
  },
  {
    id: 2,
    title: "Test Task 2",
    description: "Description 2",
    dueDate: "2025-02-15",
  },
];

describe("App", () => {
  beforeEach(() => {
    mock.onGet("http://localhost:8080").reply(200, sampleData);
    mock.onDelete().reply(200);
    mock.onPut().reply(200);
  });

  it("should render the grid with data", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Test Task 1"));
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  it("should delete selected tasks", async () => {
    render(<App />);

    await waitFor(() => screen.getByText("Test Task 1"));
    fireEvent.click(screen.getByText("Test Task 1"));
    fireEvent.click(screen.getByText("Delete Task"));

    await waitFor(() => expect(mock.history.delete.length).toBeGreaterThan(0));
  });

  it("should filter tasks based on search input", async () => {
    render(<App />);

    await waitFor(() => screen.getByText("Test Task 1"));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Task 1" },
    });

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Task 2")).not.toBeInTheDocument();
  });

  it("should edit a task's row and update it", async () => {
    render(<App />);

    await waitFor(() => screen.getByText("Test Task 1"));

    const taskTitle1 = screen.getByText("Test Task 1");
    const taskTitle2 = screen.getByText("Test Task 2");
    fireEvent.doubleClick(taskTitle1);
    fireEvent.doubleClick(taskTitle2);

    await waitFor(() => expect(mock.history.put.length).toBeGreaterThan(0));
  });
});
