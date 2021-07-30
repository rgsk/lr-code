import { InputType } from "@interfaces/InputTypes";
import { useEffect, useState } from "react";
export function useForm(
  initalFormState: {
    [key: string]: InputType;
  },
  validateOnChange = false
) {
  const [formState, setFormState] = useState(initalFormState);
  // useEffect(() => {
  //   console.log(formState);
  // }, [formState]);
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setFormState(() => {
      const updatedFormField = { ...formState[name], value };
      if (updatedFormField.error || validateOnChange) {
        if (updatedFormField.validate?.()) {
          updatedFormField.error = "";
        } else {
          updatedFormField.error = updatedFormField.errorText;
        }
      }
      return {
        ...formState,
        [name]: updatedFormField,
      };
    });
  };
  const resetForm = () => {
    setFormState(initalFormState);
  };
  return {
    formState,
    setFormState,
    handleInputChange,

    resetForm,
  };
}
