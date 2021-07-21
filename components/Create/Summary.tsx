import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import Button from "@components/Controls/Button";
import { InputIconType } from "@interfaces/InputTypes";
import { useAppSelector } from "@store/hooks";
import inputIconMap from "forms/inputIconMap";
import { FormType, useFormReturnType } from "@interfaces/FormTypes";
import { EntityLoop, EntityLooper, EntityRecipient } from "@apiClient/types";
import loopApi from "@apiClient/loopApi";
import Win from "@helpers/Win";
interface SummaryProps {
  forms: FormType[];
  formsProps: useFormReturnType[];
  generatedLoopReceipt: () => void;
}
const Summary = ({ forms, formsProps, generatedLoopReceipt }: SummaryProps) => {
  // console.log(formsProps);
  // log this to check the form state when coming to this page
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const formType = useAppSelector((state) => state.loopReceipt.type);
  const recipientFormIdx = forms.findIndex(
    (form) => form.formName === "recipientDetailsForm"
  );
  const companyFormIdx = forms.findIndex(
    (form) => form.formName === "companyDetailsForm"
  );
  const loopersFormIndex = forms.findIndex(
    (form) => form.formName === "loopersDetailsForm"
  );
  const handleSubmit = async () => {
    for (let i = 0; i < formsProps.length; i++) {
      // console.log(formsProps[i].formState);
    }
    const recipientState = formsProps[recipientFormIdx].formState;
    const recipient: EntityRecipient = {
      email: "hello@info.com.ng",
      name: "alvin",
      postalCode: recipientState.zipCode.value,
      address: recipientState.shippingAddress.value,
      city: recipientState.city.value,
      company: recipientState.receivingCompanyName.value,
      country: recipientState.country.value,
    };
    // console.log(recipient);
    const loopers: EntityLooper[] = [];
    const loopersState = formsProps[loopersFormIndex].formState;
    const loppersStateKeys = Object.keys(loopersState);
    for (let i = 0; i < loppersStateKeys.length; i += 2) {
      const name = loopersState[loppersStateKeys[i]].value;
      const email = loopersState[loppersStateKeys[i + 1]].value;
      if (name && email) {
        loopers.push({
          name,
          email,
        });
      }
    }
    // console.log(loopers);

    let loop: EntityLoop;
    switch (formType) {
      case "internal": {
        loop = {
          barcode: "ee3432r23fd",
          city: recipient.city,
          country: recipient.country,
          postalCode: recipient.postalCode,
          province: "nothing",
          type: "internal",
          loopers,
          recipient,
        };
        break;
      }
      case "external": {
        const companyState = formsProps[companyFormIdx].formState;
        loop = {
          barcode: "ee3432r23fd",
          city: companyState.city.value,
          country: companyState.country.value,
          postalCode: companyState.zipCode.value,
          province: companyState.province.value,
          type: "external",
          loopers,
          recipient,
        };
        break;
      }
    }
    const createdLoop = await loopApi.createLoop(loop);
    console.log(createdLoop);
    for (let i = 0; i < formsProps.length; i++) {
      formsProps[i].resetForm();
    }
    //   setActiveFormIndex(0);
    //   setSummaryPageActive(false);
    generatedLoopReceipt();
  };
  return (
    <div className={styles.Summary}>
      {win.up("sm") && (
        <div className="top">
          <h1 className="head">Summary</h1>
        </div>
      )}

      <div className="content">
        <div className="left">
          {recipientFormIdx != -1 && (
            <>
              <Entry
                inputIcon="location"
                text={`To: ${formsProps[recipientFormIdx].formState.receivingCompanyName.value}`}
              />
              <Entry
                inputIcon="location"
                text={
                  forms[recipientFormIdx].methods?.getCompleteAddress({
                    formState: formsProps[recipientFormIdx].formState,
                  })!
                }
              />
            </>
          )}
          <Entry inputIcon="phone" text={"+234 081-1236-4568"} />
          <Entry inputIcon="email" text={"hello@info.com.ng"} />
        </div>
        <div className="line">
          <p></p>
        </div>
        <div className="right">
          {win.down("xs") ? (
            <h1
              style={{
                fontWeight: "bold",
              }}
            >
              Loopers:
            </h1>
          ) : (
            <h1>Loopers</h1>
          )}

          {Object.values(formsProps[loopersFormIndex].formState).map(
            (input, i) => {
              return (
                input.type === "email" && (
                  <Entry key={i} inputIcon="email" text={input.value} />
                )
              );
            }
          )}
        </div>
      </div>
      <div className="bottom">
        <Button color="secondary" labelColor="white" onClick={handleSubmit}>
          Generate Loopreceipt
        </Button>
        <Image src="/icons/form/man.svg" width={300} height={300} />
      </div>
    </div>
  );
};
export default Summary;
interface EntryProps {
  inputIcon: InputIconType;
  text: string;
}
function Entry({ inputIcon, text }: EntryProps) {
  return (
    <div className="entry">
      <Image src={inputIconMap(inputIcon)} width={24} height={24} />
      <span className="text"> {text}</span>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  Summary: {
    "& .top": {
      padding: "1rem",
      borderBottom: "2px solid #DDDDDD",
      "& .head": {
        color: theme.palette.secondary.main,
        fontSize: "1.1rem",
      },
    },
    "& .content": {
      display: "flex",
      padding: "2rem",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        gap: "1.5rem",
      },

      "& .left, & .right": {
        flex: "2",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      },
      "& .line": {
        flex: "1",
        display: "flex",
        justifyContent: "center",
        "& p": {
          height: "100%",
          width: 1,
          background: "#DDDDDD",
        },
      },

      "& .entry": {
        display: "flex",
        alignItems: "center",
        gap: 30,
        "& .text": {},
      },
    },
    "& .bottom": {
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
    },
  },
}));
