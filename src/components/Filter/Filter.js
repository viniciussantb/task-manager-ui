import React, { useState } from "react";
import { InputContainer, FilterTextField, ClearButton } from "./Filter.styles";

export function Filter(props) {
  const { onChange } = props;
  const [filterText, setFilterText] = useState("");

  const handleChange = (e) => {
    onChange(e.target.value);
    setFilterText(e.target.value);
  };

  return (
    <InputContainer>
      <FilterTextField
        type="text"
        value={filterText}
        onChange={handleChange}
        placeholder="Title Filter"
      />
    </InputContainer>
  );
}
