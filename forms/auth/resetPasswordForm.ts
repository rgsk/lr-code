import validations from "@helpers/validations";
import { FormType } from "@interfaces/FormTypes";
import signupForm from "./signupForm";

const resetPasswordForm: FormType = {
  formName: "resetPasswordForm",
  formHeading: "Reset Your Password",
  initialState: {
    newPassword: {
      name: "newPassword",
      label: `New Password *`,
      placeholder: "New Password *",
      value: "",
      type: "password",
      constraints: signupForm.initialState.password.constraints,
      validate: signupForm.initialState.password.validate,
      showPasswordStrengthBar: true,
    },
    confirmPassword: {
      name: "confirmPassword",
      label: `Confirm Password *`,
      placeholder: "Confirm Password *",
      value: "",
      type: "password",
      validate: function () {
        return validations.isRequired(this);
      },
    },
  },
};
export default resetPasswordForm;
