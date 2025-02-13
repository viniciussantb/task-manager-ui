import styled from "styled-components";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  padding-top: 6px;
`;

export const Field = styled(TextField)`
  & .MuiInputBase-root {
    margin-bottom: 6px;
  }
`;

export const DateField = styled(DatePicker)`
  & .MuiInputBase-root {
    margin-bottom: 6px;
  }
`;
