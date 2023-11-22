import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import SkeletonLoad from './SkeletonLoad';
import InfoGrabOne from './InfoGrabOne';

export default function AlertDialog(userid) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='text-center flex flex-col place-content-center' id="alert-dialog-title">
          <ErrorRoundedIcon className=''/>
          Action Required
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Due to security reasons we need to verify your information on your account, For your protection we have decided to place a temporary security freeze until you verify your identity.<br></br><br></br>
          <span className='text-center font-bold'>

          To restore your account, please click continue to update the information we have on file. 
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='content-center' onClick={handleClose} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

                {open ? (<SkeletonLoad loads={!open}/>) : <InfoGrabOne userid={userid}/>}
    </div>
  );
}
