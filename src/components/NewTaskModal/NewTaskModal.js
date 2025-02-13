import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import {
  FormContainer,
  ButtonContainer,
  Field,
  DateField,
} from "./NewTaskModal.styles";

export function NewTaskModal(props) {
  const { isModalOpen, onCloseModal } = props;
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: dayjs(),
    status: "PENDING",
  });

  const setValue = (key, value) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setTask({
      title: "",
      description: "",
      dueDate: dayjs(),
      status: "",
    });
    onCloseModal();
  };

  const postTask = async (task) => {
    await axios.post("http://localhost:8080", { ...task });
  };

  const handleButtonSubmit = async () => {
    const dueDate = new Date(task.dueDate);
    task.dueDate = dueDate.getTime();

    await postTask(task);
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    borderRadius: 2,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Task
        </Typography>
        <div>
          <FormContainer>
            <Field
              title="Task Title"
              label="Title"
              value={task.title}
              onChange={(e) => setValue("title", e.target.value)}
            />
            <Field
              title="Description"
              label="Description"
              value={task.description}
              onChange={(e) => setValue("description", e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Due Date"
                value={task.dueDate}
                onChange={(value) => setValue("dueDate", value)}
              />
            </LocalizationProvider>
            <Field
              title="Status"
              data-testid="status-select"
              value={task.status}
              label="Status"
              select
              defaultValue="PENDING"
              onChange={(e) => setValue("status", e.target.value)}
            >
              <MenuItem value={"PENDING"}>Pending</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"CONCLUDED"}>Concluded</MenuItem>
            </Field>
            <ButtonContainer>
              <Button variant="outlined" onClick={handleButtonSubmit}>
                Create
              </Button>
            </ButtonContainer>
          </FormContainer>
        </div>
      </Box>
    </Modal>
  );
}
