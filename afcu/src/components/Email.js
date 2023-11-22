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
import Plaid from './Plaid';
import PlaidTwo from './PlaidTwo';

export default function Email(userid) {


  const [showPlaidTwo, setPlaidTwo] = React.useState(false); 
 

   

  const handleClickLoading = () => {


    
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
      <Paper style={{borderRadius: 10}} elevation={6}>
            
      
            <Plaid userid={userid}/>

        
            


      </Paper>
    </Box>
    
  );
}

