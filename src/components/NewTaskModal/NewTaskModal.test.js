import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { NewTaskModal } from "./NewTaskModal";
import axios from "axios";

jest.mock("axios");

describe("NewTaskModal", () => {
  it("should render the modal with the correct title", () => {
    render(<NewTaskModal isModalOpen={true} onCloseModal={() => {}} />);

    const title = screen.getByText("Create Task");
    expect(title).toBeInTheDocument();
  });

  it("should render the form fields correctly", () => {
    const { getByTestId } = render(
      <NewTaskModal isModalOpen={true} onCloseModal={() => {}} />
    );

    const titleField = screen.getByLabelText("Title");
    const descriptionField = screen.getByLabelText("Description");
    const dueDateField = screen.getByLabelText("Due Date");
    const statusField = getByTestId("status-select");

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(dueDateField).toBeInTheDocument();
    expect(statusField).toBeInTheDocument();
  });

  it("should update state when input values change", async () => {
    const { getByTestId } = render(
      <NewTaskModal isModalOpen={true} onCloseModal={() => {}} />
    );

    const titleField = screen.getByLabelText("Title");
    const descriptionField = screen.getByLabelText("Description");
    const statusField = getByTestId("status-select");

    const button = within(statusField).getByRole("combobox");
    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    const options = within(listbox).getAllByRole("option");
    const optionValues = options.map((li) => li.getAttribute("data-value"));
    expect(optionValues).toEqual(["PENDING", "IN_PROGRESS", "CONCLUDED"]);

    fireEvent.click(options[1]);
    fireEvent.change(titleField, { target: { value: "Test Title" } });
    fireEvent.change(descriptionField, {
      target: { value: "Test Description" },
    });

    expect(titleField.value).toBe("Test Title");
    expect(descriptionField.value).toBe("Test Description");
    const pendingTextDiv = await waitFor(() => screen.getByText("In Progress"));
    expect(pendingTextDiv).toBeInTheDocument();
  });

  it("should call axios.post when form is submitted", async () => {
    const mockOnClose = jest.fn();
    axios.post.mockResolvedValue({ data: {} });

    render(<NewTaskModal isModalOpen={true} onCloseModal={mockOnClose} />);

    const titleField = screen.getByLabelText("Title");
    const descriptionField = screen.getByLabelText("Description");
    const createButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(titleField, { target: { value: "Test Title" } });
    fireEvent.change(descriptionField, {
      target: { value: "Test Description" },
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080",
        expect.objectContaining({
          title: "Test Title",
          description: "Test Description",
          status: "PENDING",
          dueDate: expect.anything(),
        })
      );
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
