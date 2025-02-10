import { useState, useCallback } from "react";
import {
  DataGrid,
  GRID_DATE_COL_DEF,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { NewTaskModal } from "./components/NewTaskModal";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/utils";
import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const dateColumnType = {
  ...GRID_DATE_COL_DEF,
  resizable: false,
  renderEditCell: (params) => {
    return <GridEditDateCell {...params} />;
  },
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  { field: "age", headerName: "Age", width: 150, editable: true },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: true,
    ...dateColumnType,
  },
];

function GridEditDateCell({ id, field, value, colDef, hasFocus }) {
  const apiRef = useGridApiContext();
  const inputRef = React.useRef(null);
  const Component = DatePicker;

  const handleChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  return (
    <DatePicker
      value={value}
      autoFocus
      onChange={handleChange}
      slotProps={{
        textField: {
          inputRef,
          variant: "standard",
          fullWidth: true,
          sx: {
            padding: "0 9px",
            justifyContent: "center",
          },
          InputProps: {
            disableUnderline: true,
            sx: { fontSize: "inherit" },
          },
        },
      }}
    />
  );
}

const rows = [
  { id: 1, name: "John Doe", age: 25, date: new Date() },
  { id: 2, name: "Jane Smith", age: 32, date: new Date() },
  { id: 4, name: "Alice Johnson", age: 40, date: new Date() },
];

export default function EditableDataGrid() {
  const [data, setData] = useState(rows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selection, setSelection] = useState();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRowEdit = useCallback(
    (newRow, oldRow) => {
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
      <Button onClick={handleOpenModal}>Create Task</Button>
      <NewTaskModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        processRowUpdate={handleRowEdit}
        checkboxSelection
        onRowSelectionModelChange={setSelection}
      />
    </Box>
  );
}
