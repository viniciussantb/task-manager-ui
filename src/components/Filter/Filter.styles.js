import styled from "styled-components";

export const FilterTextField = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;

  &::placeholder {
    color: #888;
  }

  &:hover {
    border-color: #888;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: inline-block;
`;
