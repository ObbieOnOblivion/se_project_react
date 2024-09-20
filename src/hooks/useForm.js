import React, { useCallback, useState } from "react";
export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  return { values, handleChange, setValues };
}
//eslint {dependancy array problems}
//command . enter inbetween []
// should not define components in other components 