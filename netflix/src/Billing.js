import { useRef, useEffect, useReducer, useState, createRef, Component } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MaskedInput from 'react-text-mask'
import PropTypes from "prop-types";
import Visibility from '@mui/icons-material/Visibility';
import Places from './Places';
import { alpha, styled } from '@mui/material/styles';
import {  AMERICANEXPRESS, OTHERCARDS, EXPIRYDATE, CVC,  CARDARR, CARDICON } from "./constant";
import { stripeCardNumberValidation, stripeCardExpirValidation, textWithSpacesOnly, minLength} from "./validations";
import { InputAdornment, StepIcon } from "@mui/material";
 


export class TextMaskInput extends Component {
    
    render() {
        
        const {inputRef, ...other} = this.props; 
        console.log(other); 
        
        return (
            <MaskedInput
            {...other}
         
            mask={EXPIRYDATE}
            name="expiry"
            required
            placeholderChar={"\u2000"}
            placeholder=" (MM/YY)"
            
            />
        )

    }
}

export default TextMaskInput