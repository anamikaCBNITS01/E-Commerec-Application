import { Button, Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import InterestsIcon from '@mui/icons-material/Interests';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { Link, useHistory, usehistory } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import { LinkContainer } from 'react-router-bootstrap';



const SideBar = (props) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

    

    const [profile, setProfile] = useState(false)
    const [myWishlist, setMyWishList] = useState(false)
    const [menuItem, setMenuItem] = useState(false)
    const [open, setOpen] = useState(false);
    
    let history = useHistory();
   

    const openBox=()=>{
        setMenuItem(!menuItem)
    }
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logoutHandler = () => {
      dispatch(logout());
      window.location.reload();
    };

    const isProfile = () => {
        const loggedInUser = window.localStorage.getItem("userData")=="true";
        if(loggedInUser){
            setProfile(true)
            history.push('/profile')
        }else{
            setProfile(false)
            setOpen(true)
            // return(<Login open={open}/>)
        }   

    }

    const isMyWishlist = () => {
        const loggedInUser = window.localStorage.getItem("userData")=="true";
        if(loggedInUser){
            setMyWishList(true)
            history.push('/wishlist')
        }else{
            setProfile(false)
            setOpen(true)
            // return(<Login open={open}/>)
        }   

    }

    const data = window.localStorage.getItem("userData");
    const signout = () => {
        localStorage.removeItem("userData");
        setProfile(false)
        history.push('/')
        window.location.reload(true)

    }

    const wishList = useSelector((state) => state.wishList);
  const { wishlistItems } = wishList;
  console.log("wishlistItems sidebar",wishlistItems);

    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <div style={{ float: "left", width: "300px", backgroundColor: "#333333", height: "1000vh" }}>
                <CancelIcon sx={{position:"relative", left:"17rem", color:"white"}} onClick={props.onClose} />
                <div>
                    <div className={styles.ItemWithIcon}>
                        <div className={styles.IconColor}><HomeIcon /></div>
                        <div><Link to="/" className={styles.IconColor}>Home</Link></div>
                    </div>
                    <div className={styles.ItemWithIcon}>
                        <div>
                            <div className={styles.AccountClass} onClick={openBox}>
                            <div>Your Accounts</div>
                            <div><KeyboardArrowDownIcon/></div>
                             </div>
                            
                            <div className={menuItem?styles.ItemsD:styles.ItemsND}>
                                <ul>
                                    <li className={styles.AccountListItem}><Link to="/" className={styles.IconColor}></Link></li>
                                    <li className={styles.AccountListItem}><Link to="/myDetails" className={styles.IconColor}>My Details</Link></li>
                                    <li className={styles.AccountListItem}>{userInfo ? <div onClick={()=>history.push('/profile')} className={styles.IconColor}>Profile</div> : <div onClick={()=>history.push('/login')} className={styles.IconColor}>Profile</div>}</li>
                                    <LinkContainer  to="/wishlist" className={styles.IconColor}><li className={styles.AccountListItem}>WishList</li></LinkContainer>
                                    <li className={styles.AccountListItem}><Link to="/cart" className={styles.IconColor}>Cart</Link></li>
                                    <li className={styles.AccountListItem}><Link to="/" className={styles.IconColor}>Payment</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ItemWithIcon}>
                        <div><InterestsIcon /></div>
                        <div><Link to="/wishlist" className={styles.IconColor}>Wish List</Link></div>
                    </div>
                    <div className={styles.ItemWithIcon}>
                        <div><InfoIcon /></div>
                        <div><Link to="/about" className={styles.IconColor}>About</Link></div>
                    </div>
                    <div className={styles.ItemWithIcon}>
                        <div><AddIcCallIcon /></div>
                        <div><Link to="/contactUs" className={styles.IconColor}>Contact-Us</Link></div>
                    </div>

                    <div className={styles.ItemWithIcon}>
                        <div><AddIcCallIcon /></div>
                        <div>{userInfo ? <Button sx={{color:"white"}} onClick={logoutHandler}>Logout</Button> : <Button sx={{color:"white"}} onClick={()=>history.push('/login')}>Login</Button>}</div>
                    </div>

                </div>
            </div>
            {/* <Login open={open} onClose={handleClose} /> */}
        </Drawer>
    )
}

export default SideBar