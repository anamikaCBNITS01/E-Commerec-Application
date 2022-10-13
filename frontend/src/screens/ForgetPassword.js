import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPasswordLink } from '../actions/userAction';

const ResetLinkPage = (props) => {
  const emailRef = useRef();
  const [otpData, setOtpData] = useState(props.open)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.resetPassword);
//   const { loading, error, userInfo } = resetPassword;

  const sendLink = async (e) => {
    e.preventDefault();
    //dispatch
   
        dispatch(resetPasswordLink(emailRef.current.value));
}
  return (
    
       <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
               <Box>
                    <DialogTitle id="alert-dialog-title">
                        {"Forgot Password"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        <input variant='standard' label="Enter Email Id" type='email' name="email" ref={emailRef} placeholder="Enter Email Id"/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancle</Button>
                        <Button onClick={sendLink} autoFocus>
                            Send Otp
                        </Button>
                    </DialogActions>
                </Box> 
            </Dialog>
    
  )
}

export default ResetLinkPage
