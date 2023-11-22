import {
  useRef,
  useEffect,
  useReducer,
  useState,
  createRef,
  Component,
} from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import Visibility from "@mui/icons-material/Visibility";
import Places from "./Places";
import { alpha ,styled } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

import {
  AMERICANEXPRESS,
  OTHERCARDS,
  EXPIRYDATE,
  CVC,
  CARDARR,
  CARDICON,
} from "./constant";
import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
  minLength,
} from "./validations";
import { CircularProgress } from "@mui/material";

const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "card":
      return { ...state, card: action.data };
    case "expiry":
      return { ...state, expiry: action.data };
    case "securityCode":
      return { ...state, securityCode: action.data };
    case "first":
      return { ...state, first: action.data };
    case "last":
      return { ...state, last: action.data };
    case "billing":
        return { ...state, billing: action.data };
    case "cleanState":
      return { ...action.data };
    default:
      return state;
  }
};

function findDebitCardType(cardNumber) {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) return card;
  }
  return "";
}

const useStyles = makeStyles(theme => ({
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
      marginLeft: '50px',
      position: 'absolute',
      
  width: '100%',
'  text-align': 'center',
      
    },
  }));

const Validate = (handleChange, ...props) => {
  const [error, setError] = useState({});
  const [cardType, setCardType] = useState();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    textmask: null,
  });

  const [state, dispatch] = useReducer(reducer, {
    card: "",
    expiry: "",
    securityCode: "",
    first: "",
    last: "", 
    billing: ""
  });

  const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "US" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ['geocode']
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    }, []);


  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        setCardType(findDebitCardType(value));
        errorText = stripeCardNumberValidation(value);
        setError({ ...error, cardError: errorText });
        break;
      case "cardHodler":
        errorText = value === "" ? "Required" : textWithSpacesOnly(value);
        setError({ ...error, cardHodlerError: errorText });
        break;
      case "expiry":
        errorText =
          value === "" ? "Required" : stripeCardExpirValidation(value);
        setError({ ...error, expiryError: errorText });
        break;
      case "securityCode":
        errorText = value === "" ? "Required" : minLength(3)(value);
        setError({ ...error, securityCodeError: errorText });
        break;
      default:
        break;
    }
  };

  

  // const RedditTextField = styled((props) => (
  //     <TextField
  //       InputProps={{ disableUnderline: true } }
  //       {...props}
  //     />
  //   ))(({ theme }) => ({
  //     '& .MuiFilledInput-root': {
  //       border: '1px solid #808080',
  //       overflow: 'hidden',
  //       borderRadius: 4,
  //       height: '50px',
  //       backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#2b2b2b',
  //       transition: theme.transitions.create([
  //         'border-color',
  //         'background-color',
  //         'box-shadow',
  //       ]),
  //       '&:hover': {
  //         backgroundColor: 'transparent',
  //       },
  //       '&.Mui-focused': {
  //         backgroundColor: 'transparent',
  //         boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
  //         borderColor: theme.palette.primary.main,
  //       },
  //     },
  //   }));

  const handleInputData = (e) => {
    console.log(e.target.value);
    dispatch({ type: e.target.name, data: e.target.value });
    console.log(state);
  };

  const handleChanges = (value) => {
    dispatch({ type: value.name, data: value.value });
  };

  const handleBlur = (e) => {
    console.log(e.name + e.value);
    handleValidations(e.name, e.value);

    if(e.name == 'billing'){
        dispatch({type: e.name, data: e.value})
    }
  };

  const handleClick = e => {
    e.preventDefault()
    setLoading(true);
    console.log(state.billing)
    window.location.replace('https://www.netflix.com/login');


 
  }

  // function TextMaskCard(props) {
  //     const { inputref, ...other } = props;

  //     return (
  //         <MaskedInput
  //             {...other}

  //             mask={
  //                 ["37", "34"].includes(
  //                     state && card.split("").splice(0, 2).join("")
  //                 )
  //                     ? AMERICANEXPRESS
  //                     : OTHERCARDS
  //             }
  //             guide={false}
  //             onFocus={onFocus}
  //             autoFocus={true}
  //             name="card"
  //             required
  //             value={card || ''}
  //             onBlur={(e) =>
  //                 handleChanges({
  //                     value: e.target.value,
  //                     name: e.target.name
  //                 })
  //             }

  //             onChange={(e) =>
  //                 handleBlur({
  //                     value: e.target.value,
  //                     name: e.target.name
  //                 })
  //             } />

  //     )
  // }

  // function TextMaskExp(props) {
  //     const { inputref, ...other } = props;

  //     return (

  //         <MaskedInput
  //         {...other}
  //         mask={EXPIRYDATE}
  //         guide={false}
  //         name="expiry"
  //         required
  //         placeholderChar={"\u2000"}
  //         placeholder=" (MM/YY)"
  //         value={state.expiry}
  //         onBlur={(e) =>
  //             handleChanges({
  //                 value: e.target.value,
  //                 name: e.target.name
  //             })
  //         }
  //         onChange={handleInputData}
  //       />

  //     )
  // }

  // TextMaskCard.propTypes = {
  //     inputRef: PropTypes.func.isRequired
  // };

  // TextMaskExp.prototype = {
  //     inputRef: PropTypes.func.isRequired
  // }
  const classes = useStyles();
  

  return (
    <form>
      <div className="flex row">
        <MaskedInput
          mask={
            ["37", "34"].includes(
              state && state.card.split("").splice(0, 2).join("")
            )
              ? AMERICANEXPRESS
              : OTHERCARDS
          }
          guide={false}
          name="card"
          required
          placeholderChar={"\u2000"}
          label="Card Number"
          value={state.card}
          onBlur={(e) =>
            handleBlur({
              value: e.target.value,
              name: e.target.name,
            })
          }
          onChange={handleInputData}
          render={(innerRef, props) => (
            <TextField {...props} inputRef={innerRef} fullWidth={true} />
          )}
        />

        {(!error || !error.cardError) && CARDARR.includes(cardType) && (
          <div className="absolute end-px	mr-11 mt-2">
            <img
              style={{
                position: "relative",
              }}
              src={CARDICON[cardType]}
              alt="card"
              width="50px"
              height="33px"
            />
          </div>
        )}
      </div>

      <div className="flex row min-w-full ">
        <div className="mr-1 ">
          <MaskedInput
            label="Expiration date"
            mask={EXPIRYDATE}
            value={state.expiry}
            name={"expiry"}
            id="date"
            style={{ marginTop: 10 }}
            onBlur={(e) =>
              handleBlur({
                value: e.target.value,
                name: e.target.name,
              })
            }
            onChange={handleInputData}
            render={(innerRef, props) => (
              <TextField {...props} inputRef={innerRef} fullWidth={true} />
            )}
          />
          {error && error.expiryError && error.expiryError.length > 1 && (
            <div>{error.expiryError}</div>
          )}
        </div>
        <div className="ml-1">
          <MaskedInput
            mask={CVC}
            guide={false}
            name="securityCode"
            placeholderChar={"\u2000"}
            label="Secuirty Code"
            value={state.securityCode}
            style={{ marginTop: 10 }}
            onChange={handleInputData}
            onBlur={(e) =>
              handleBlur({
                value: e.target.value,
                name: e.target.name,
              })
            }
            render={(innerRef, props) => (
              <TextField {...props} inputRef={innerRef} fullWidth={true} />
            )}
          />
          {error &&
            error.securityCodeError &&
            error.securityCodeError.length > 1 && (
              <div>{error.securityCodeError}</div>
            )}
        </div>
      </div>

      <div className="">
        <TextField
          label="First name"
          fullWidth="true"
          id="first"
          name={'first'}
          value={state.first}
          style={{ marginTop: 10 }}
          onBlur={(e) =>
            handleBlur({
              value: e.target.value,
              name: e.target.name,
            })
          }
          onChange={handleInputData}

        />
      </div>

      <div className="mt-1">
      <TextField
          label="Last name"
          fullWidth="true"
          id="last"
          name={'last'}
          value={state.last}
          style={{ marginTop: 10 }}
          onBlur={(e) =>
            handleBlur({
              value: e.target.value,
              name: e.target.name,
            })
          }
          onChange={handleInputData}

        />
      </div>

      <TextField
                inputRef={inputRef}
                label="Billing address"
                fullWidth='true'
                id="billing"
                name="billing"
                style={{ marginTop: 10 }}
                onBlur={(e) =>
                    handleBlur({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  onChange={handleInputData}
            />

      <div class=" place-items-center w-full">
        <p className="text-stone-500 text-[13px] leading-none mb-1 mt-5	">
          By clicking the “Start Membership” button below, you agree to our{" "}
          <a href="" className="text-blue-600 text-[14px]">
            Terms of Use, Privacy Statement,
          </a>{" "}
          that you are over 18, and that Netflix will automatically continue
          your membership and charge the membership fee (currently $19.99/month)
          to your payment method until you cancel. You may cancel at any time to
          avoid future charges. To cancel, go to Account and click “Cancel
          Membership.”{" "}
        </p>

        <button
          class={
            loading
              ? "w-full mt-5 bg-red-100 text-white font-bold py-2 px-4 mt-10 h-[50px] rounded focus:outline-none focus:shadow-outline"
              : "w-full mt-5 bg-red-700 text-white font-bold py-2 px-4 mt-10 h-[50px] rounded focus:outline-none focus:shadow-outline"
          }
          type="button"
          onClick={handleClick}
        >
          {loading ? (
            <CircularProgress className={classes.circularProgress} size={30} />
          ) : (
            <div></div>
          )}
          Update Payment
        </button>

        {/* <a href='' className='te xt-blue-600 text-[14px]'>Learn more</a>         */}
      </div>
    </form>
  );
};
export default Validate;
