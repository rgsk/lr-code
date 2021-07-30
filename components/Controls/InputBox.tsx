import { InputType } from "@interfaces/InputTypes";
import { makeStyles, Theme } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { useEffect, useRef } from "react";
import { usePreviousValue } from "@hooks/usePreviousValue";
// console.log(CountryRegionData);
interface InputBoxProps {
  input: InputType;
  onChange: React.ChangeEventHandler<Element>;
  onBlur: React.FocusEventHandler<Element>;
  dependency?: string;
  resetValue?: () => void;
}
function InputBox({
  input,
  onChange,
  onBlur,
  dependency,
  resetValue,
}: InputBoxProps) {
  const styles = useStyles();
  const previousDependency = usePreviousValue(dependency);
  useEffect(() => {
    if (input.type === "phone" && previousDependency) {
      resetValue?.();
    }
  }, [dependency]);
  return (
    <div className={styles.inputBox}>
      <label className="label">{input.label}</label>
      {input.type === "country" ? (
        <CountryDropdown
          classes={styles.input}
          name={input.name}
          value={input.value}
          onChange={(val, e) => {
            onChange(e as any);
          }}
          onBlur={(val, e) => {
            onBlur(e as any);
          }}
        />
      ) : input.type === "region" ? (
        <RegionDropdown
          classes={styles.input}
          country={dependency!}
          name={input.name}
          value={input.value}
          onChange={(val, e) => {
            onChange(e as any);
          }}
          onBlur={(val, e) => {
            onBlur(e as any);
          }}
        />
      ) : input.type === "phone" ? (
        <div className={styles.phoneInput}>
          <PhoneInput
            international
            defaultCountry={
              CountryRegionData.find((data) => data[0] === dependency)?.[1]
            }
            value={input.value}
            onChange={(value) => {
              const e = {
                target: {
                  name: input.name,
                  value,
                },
              };
              onChange(e as any);
            }}
            onBlur={(e) => {
              onBlur(e as any);
            }}
          />
        </div>
      ) : (
        <input
          className={styles.input}
          type={input.type}
          name={input.name}
          value={input.value}
          onChange={onChange}
          placeholder={input.placeholder}
          onBlur={onBlur}
        ></input>
      )}
      <p className="error">{input.error}</p>
    </div>
  );
}

export default InputBox;
const inputCommon = (theme: Theme) => ({
  width: "80%",

  padding: ".7rem",
  borderRadius: "4px",
  border: "1px solid #DDDDDD",
  backgroundColor: "white",
  outline: "none",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
});
const useStyles = makeStyles((theme) => {
  // console.log(theme.breakpoints.values);
  return {
    inputBox: {
      "& .label": {
        display: "block",
        fontWeight: "bold",
        marginBottom: ".5rem",
        fontSize: "1.1rem",
      },
      "& .error": {
        color: "red",
      },
    },
    input: inputCommon(theme),
    phoneInput: {
      "& input": inputCommon(theme),
    },
  };
});
