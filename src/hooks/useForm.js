import React, { useCallback, useState } from "react";
export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
};
  // const handleChange = useCallback((event) => {
  //   const { value, name } = event.target;
  //   console.log(value, name, event.target);
  //   setValues({ ...values, [name]: value });
  // }, [setValues, values]);
  return { values, handleChange, setValues };
}
//eslint {dependancy array problems}
//command . enter inbetween []
// should not define components in other components 