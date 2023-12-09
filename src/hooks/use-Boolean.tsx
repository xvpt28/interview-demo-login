import { useState } from "react";

const useBoolean = (initValue: boolean) => {
  const [value, setValue] = useState(initValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return { value, toggle, setTrue, setFalse };
};

export default useBoolean;
