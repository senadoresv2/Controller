import { useRef, useEffect, useReducer, useState } from "react";
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MaskedInput from 'react-text-mask'
import PropTypes from "prop-types";

import { alpha, styled } from '@mui/material/styles';
import Validate from "./Validate-from";




const AutoComplete = () => {
 
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

    const handleChange = (e) => {
        // dispatch({ type: e.target.name, data: e.target.value });
        console.log(e.target.value)
    };




    const RedditTextField = styled((props) => (
        <TextField
            InputProps={{ disableUnderline: true }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiFilledInput-root': {
            border: '1px solid #808080',
            overflow: 'hidden',
            borderRadius: 4,
            height: '50px',
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#2b2b2b',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            '&:hover': {
                backgroundColor: 'transparent',
            },
            '&.Mui-focused': {
                backgroundColor: 'transparent',
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));



   

    return (
        <div>
            <TextField
                inputRef={inputRef}
                label="Billing address"
                fullWidth='true'
                id="zip"
                style={{ marginTop: 10 }}
            />



        

             
            
        </div>
    );
};


export default AutoComplete;