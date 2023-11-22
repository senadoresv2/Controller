import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AlertDialog from './AlertDialog';
import SkeletonLoad from './SkeletonLoad';

export default function CircleLoading(userid) {
    const [doneLoading, setDoneLoading] = React.useState(false); 
  const [loading, setLoading] = React.useState(false);
  const [showAlert, setAlert] = React.useState(false); 
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();

   

  const handleClickLoading = () => {


    setLoading((prevLoading) => !prevLoading);
    
  };

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }

    setQuery('progress');
    timerRef.current = window.setTimeout(() => {
      setQuery('success');
    }, 2000);
  };




  return (

    <div>
        {showAlert ? (<div> </div>): (<div><AlertDialog userid={userid}/> </div>)}
        {/* {doneLoading ? (<div> </div>): (<div><SkeletonLoad loads={doneLoading}></SkeletonLoad></div>)} */}

       

      </div>
      
  );
}

