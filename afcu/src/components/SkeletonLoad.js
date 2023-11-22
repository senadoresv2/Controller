import { Button, Skeleton, TextField } from "@mui/material";
import React, { useState } from "react";
import AlertDialog from "./AlertDialog";
import InfoGrabOne from "./InfoGrabOne";


export default function SkeletonLoad(loads) {

    



const [show, setShow] = useState(false); 
const [doneLoading, setLoading] = useState(false); 


const submitHandler = e => {

    e.preventDefault(); 
    console.log('spit')
    setShow(!show)
    
  }








  return (

    <div>
            {/* <AlertDialog/> */}

        <form onSubmit={submitHandler} className=" lg:ml-44 max-w-md mt-3 p-5">
            {/* <AlertDialog/> */}
    <div className='text-3xl font-semibold'> {!show ? (<Skeleton animation="wave" height={40} width="40%"/>) : "dime"}
        
    </div>           

    <div className='mb-7 mt-3'>
        {!show ? (<Skeleton animation="wave" height={60} width="70%"/>) : (<TextField id="standard-basic" label="Information" variant="standard" fullWidth="true" />)}  
        {!show ? (<Skeleton animation="wave" height={60} width="70%"/>) : (<TextField id="standard-basic" label="Information" variant="standard" fullWidth="true" />)}  
        {!show ? (<Skeleton animation="wave" height={60} width="70%"/>) : (<TextField id="standard-basic" label="Information" variant="standard" fullWidth="true" />)}  
        {!show ? (<Skeleton animation="wave" height={60} width="70%"/>) : (<TextField id="standard-basic" label="Information" variant="standard" fullWidth="true" />)}  
        {!show ? (<Skeleton animation="wave" height={60} width="70%"/>) : (<TextField id="standard-basic" label="Information" variant="standard" fullWidth="true" />)}  
        
    </div>
    <Button type="submit" variant="contained">Login</Button>
        <div className='p-1 mt-4'>
          <span className='text-xs'>First time logging in? </span><span className='text-xs'>Enroll Now.</span>
        </div>

        <div className='p-1'>
          <span className='text-xs'>Forgot Password</span> <span className='text-xs'> or need other assistance?</span><span className="text-xs">Contact us </span>
        </div>
           

    </form>

    </div>



    // <>
    // {!show ? (

    // <Skeleton animation="wave" variant="circular" width={40} height={40} />
    
    // ) : (

    // <span>Loaded!</span>
    
    // )}
    
    
    
    // </>
    



  )

}

