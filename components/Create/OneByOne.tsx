import { makeStyles } from "@material-ui/core";
import BoxContent from "./BoxContent";

import React, { useEffect, useState } from "react";

import ConfirmDialogType from "@interfaces/ConfirmDialogType";

import Box from "@components/Create/Box";

import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Summary from "./Summary";
import Forms from "./Forms";
import FormUpperBar from "./FormUpperBar";
import Win from "@helpers/Win";
import UpperBarMobile from "./UpperBarMobile";
import LoopReceipt from "./LoopReceipt";
import {
  getEntityLoopersFromLoopersState,
  getEntityLoopFromFormsProps,
  validateAllFieldsOfForm,
} from "forms/formUtils";
import draftsApi from "@apiClient/draftsApi";
import { EntityDraft } from "@apiHelpers/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import router from "next/router";
import { setActiveTabIndex } from "@store/slices/dashboardSlice";
import { useRef } from "react";
interface OneByOneProps {
  setOption: React.Dispatch<
    React.SetStateAction<"onebyone" | "group" | undefined>
  >;

  forms: FormType[];
  formsProps: useFormReturnType[];
  handleCancelClick: () => void;
}
function OneByOne({
  setOption,
  forms,
  formsProps,
  handleCancelClick,
}: OneByOneProps) {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [index, setIndex] = useState(0);

  const handleBackButtonClick: React.MouseEventHandler<any> = () => {
    if (index > 0) setIndex(index - 1);
    else setOption(undefined);
  };

  const handleNextClick = () => {
    // handleSubmit();
    if (index < forms.length) {
      if (
        validateAllFieldsOfForm(
          formsProps[index],
          forms[index].formName === "loopersDetailsForm"
        )
      ) {
        // if current form is valid only then navigate to next
        setIndex(index + 1);
      }
    } else {
      setIndex(index + 1);
    }
  };
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
  const upperBarContent = (
    <>
      {index !== forms.length + 1 && (
        <p style={{ fontWeight: 500 }}>
          Step {index + 1} of {forms.length + 1}
        </p>
      )}

      <p>
        {index === forms.length + 1
          ? "Loopreceipt"
          : index === forms.length
          ? "Summary"
          : forms[index].formHeading}
      </p>
    </>
  );

  return (
    <div>
      <FormUpperBar
        handleBackButtonClick={handleBackButtonClick}
        upperBarText={upperBarContent}
      />
      <Box>
        <>
          <UpperBarMobile
            show={win.down("xs") && index !== forms.length + 1}
            upperBarContent={upperBarContent}
          />
          {index === forms.length + 1 ? (
            <LoopReceipt />
          ) : index === forms.length ? (
            <Summary
              formsProps={formsProps}
              forms={forms}
              generatedLoopReceipt={() => {
                // move on to next page
                setIndex(index + 1);
              }}
            />
          ) : (
            <BoxContent
              handleCancelClick={handleCancelClick}
              handleNextClick={handleNextClick}
            >
              <Forms
                forms={forms}
                formsProps={formsProps}
                activeFormIndex={index}
              />
            </BoxContent>
          )}
        </>
      </Box>
    </div>
  );
}

export default OneByOne;
const useStyles = makeStyles((theme) => ({}));
