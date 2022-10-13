import { AppBar, Button, Fab } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import OrderScreen from './OrderScreen'
import ProfileScreen from './ProfileScreen'

const MyDetails = () => {
    const [isProfile, setIsProfile] = useState('profile')
    return (
        <>
            <Container>
                <AppBar position="static" color="default">
                    <Box sx={{display:"flex",justifyContent:"space-evenly", alignItems:"center"}}>
                        <Button sx={isProfile === 'profile' ? {backgroundColor:"#00a4bc !important"} : {backgroundColor:"white !important" ,color:"black !important"} } fullWidth variant='contained' onClick={() => setIsProfile('profile')}>My Profile</Button>
                        <Button sx={isProfile === 'orders' ? {backgroundColor:"#00a4bc !important"} : {backgroundColor:"white !important",color:"black !important"} } fullWidth variant='contained' onClick={() => setIsProfile('orders')}>My Orders</Button>
                    </Box>
                </AppBar>
            </Container>

            <div>
                {
                    isProfile === 'profile'
                    &&
                    <div>
                        <ProfileScreen />
                    </div>
                }
                {
                    isProfile === 'orders'
                    &&
                    <div>
                        <OrderScreen />
                    </div>
                }
            </div>
        </>
    )
}

export default MyDetails