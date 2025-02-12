import { useState, useCallback, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Filter } from "./components/Filter/Filter";
import { NewTaskModal } from "./components/NewTaskModal/NewTaskModal";
import { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Header, ButtonContainer } from "./App.styles";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "title", headerName: "Title", width: 300, editable: true },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    editable: true,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 300,
    editable: true,
    type: "date",
    valueGetter: (value, row) => dayjs(value).toDate(),
  },
];

export default function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [filter, setFilter] = useState("");
  const filteredData = useMemo(() => {
    return data.filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const fetchData = async () => {
    const taskManagerResponse = await axios.get("http://localhost:8080");
    setData(taskManagerResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const handleDeleteTask = async () => {
    const deleteTask = selection.map((id) =>
      axios.delete(`http://localhost:8080/${id}`)
    );

    await Promise.all(deleteTask);

    fetchData();
  };

  const handleRowEdit = useCallback(
    (newRow) => {
      const dueDate = newRow.dueDate.toISOString().split("T")[0];
      axios.put(`http://localhost:8080/${newRow.id}`, { ...newRow, dueDate });
      const updatedData = data.map((row) =>
        row.id === newRow.id ? newRow : row
      );
      setData(updatedData);
      return newRow;
    },
    [data]
  );

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Header>
        <ButtonContainer>
          <Button onClick={handleOpenModal}>Create Task</Button>
          {selection.length > 0 && (
            <Button color="error" onClick={handleDeleteTask}>
              Delete Task
            </Button>
          )}
        </ButtonContainer>
        <Filter onChange={setFilter} />
      </Header>
      <NewTaskModal
        isModalOpen={isModalOpen}
        onCloseModal={handleOnCloseModal}
      />
      <DataGrid
        rows={filteredData}
        columns={columns}
        editMode="row"
        pageSize={25}
        rowsPerPageOptions={[5]}
        processRowUpdate={handleRowEdit}
        checkboxSelection
        onRowSelectionModelChange={setSelection}
      />
    </Box>
  );
}
