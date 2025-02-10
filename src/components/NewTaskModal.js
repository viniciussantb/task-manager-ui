import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { BoxModal, FormContainer, ButtonContainer } from "./NewTaskModalStyle";

export function NewTaskModal(props) {
  const { isModalOpen, onCloseModal } = props;
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: dayjs(),
    status: "",
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
        <FormContainer>
          <TextField
            title="Task Title"
            label="Title"
            value={task.title}
            onChange={(e) => setValue("title", e.target.value)}
          />
          <TextField
            title="Description"
            label="Description"
            value={task.description}
            onChange={(e) => setValue("description", e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={task.dueDate}
              onChange={(value) => setValue("dueDate", value)}
            />
          </LocalizationProvider>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={task.status}
            label="Status"
            onChange={(e) => setValue("status", e.target.value)}
          >
            <MenuItem value={10}>Pending</MenuItem>
            <MenuItem value={20}>Done</MenuItem>
            <MenuItem value={30}>Aborted</MenuItem>
          </Select>
          <ButtonContainer>
            <Button variant="outlined">Create</Button>
          </ButtonContainer>
        </FormContainer>
      </Box>
    </Modal>
  );
}
