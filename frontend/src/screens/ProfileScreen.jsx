import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { ORDER_CREATE_REQUEST } from "../constants/orderConstant";
import { Card, Typography, CardContent, CardActions, CardMedia, CardActionArea, Button, Avatar, ListItem, ListItemAvatar, ListItemText, Divider, List, Modal, TextField, FormControl, Radio, FormControlLabel, RadioGroup, FormLabel, IconButton, Snackbar, Alert } from '@mui/material'
import { Box } from "@mui/system";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import HomeWorkSharpIcon from '@mui/icons-material/HomeWorkSharp';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { Col, Form } from "react-bootstrap";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  border: '2px solid white',
  borderRadius: "25px",
  boxShadow: 24,
  p: 3,
};

const TextFieldStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginTop: "20px"
}

const ProfileScreen = ({ location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [getUserFirstLetter, setGetUserFirstLater] = useState('');


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

  const [toastopen, setToastOpen] = React.useState(false);
  const history = useHistory();

  const handleClick = () => {
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        console.log("user Data", user)
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setCity(user.city);
        setAddress(user.address);
        setState(user.state);
        setPincode(user.pincode);
        setLandmark(user.landmark);
        setGender(user.gender);
        setGetUserFirstLater(user.email[0].toUpperCase())
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(updateUserProfile({ id: user._id, name, email, phone, city, address, state, pincode, landmark, gender, password }));
    window.location.reload(false)
    // alert("profile updated")
    setToastOpen(true)
  };

  const backToHome=()=>{
    history.push('/')
    window.location.reload();
}
  

  return (
    <>
      <Snackbar open={toastopen} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
          Profile Updated SuccessFully
        </Alert>
      </Snackbar>
      <Box>
        <Button onClick={backToHome} variant="contained" sx={{backgroundColor:"#394165 !important",color:"white"}}><ArrowBackIcon/> {' '} Go Back To Home</Button>
      </Box>
      <Card sx={{ maxWidth: "80%", boxShadow: "1px 1px 30px 1px gray", marginLeft: '10rem', marginTop: "1rem" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "30%", backgroundColor: "#394165", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Avatar
              sx={{ bgcolor: "#394165", color: "white", width: "80px", height: "80px", fontSize: "50px", boxShadow: "3px 3px 150px 1px white" }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            >
              {getUserFirstLetter}
            </Avatar>
            <Box sx={{ color: "white", fontWeight: "bold", mt: 2, fonztSize: "20px" }}>
              {user.name ? user.name : "Not Available"}
            </Box>
            <Box sx={{ color: "white", fontWeight: "bold", mt: 2, fonztSize: "20px" }}>
              {user.email ? user.email : "Not Available"}
            </Box>
            <Box sx={{ color: "white", fontWeight: "bold", mt: 2, fonztSize: "20px" }}>
              <Button sx={{backgroundColor:"#00a4bc !important",border:"none !important"}} fullWidth variant="contained" onClick={handleOpen}><EditIcon/>{' '}Edit profile</Button>
            </Box>
          </Box>
          <CardContent>
            <Box component="div" sx={{ display: "flex" }}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email ? user.email : "Not Available"}
                </Typography>
              </Box>
              <Box sx={{ position: "relative", left: "100px" }}>
                <Typography gutterBottom variant="h5" component="div">
                  phone
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.phone ? user.phone : "Not Available"}
                </Typography>
              </Box>
            </Box>
            <Box component="div" sx={{ display: "flex", mt: 3 }}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  Gender
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.gender ? user.gender : "Not Available"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 5 }}>
              <h2>Address</h2>
            </Box>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                display: "flex"
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <PinDropIcon />
                </ListItemAvatar>
                <ListItemText primary="Pincode" secondary={user.pincode ? user.pincode : "Not Available"} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <LocationCityIcon />
                </ListItemAvatar>
                <ListItemText primary="City" secondary={user.city ? user.city : "Not Available"} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <ApartmentIcon />
                </ListItemAvatar>
                <ListItemText sx={{ width: "500px" }} primary="State" secondary={user.state ? user.state : "Not Available"} />
              </ListItem>
            </List>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                display: "flex"
              }}
            >
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <AddLocationAltIcon />
                </ListItemAvatar>
                <ListItemText primary="landmark" secondary={user.landmark ? user.landmark : "Not Available"} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <MapsHomeWorkIcon />
                </ListItemAvatar>
                <ListItemText sx={{ width: "500px" }} primary="Home Address" secondary={user.address ? user.address : "Not Available"} />
              </ListItem>
            </List>
          </CardContent>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </Box>
          <Box>
            <h2>Update Information</h2>
            {error && <Message varient="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={submitHandler}>

              <Box sx={TextFieldStyle}>
                <TextField
                  type="text"
                  placeholder="enter Name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  type="email"
                  label="Email"
                  placeholder="enter email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box sx={TextFieldStyle}>
                <TextField
                  type="phone"
                  placeholder="enter phone"
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  type="text"
                  placeholder="enter city"
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Box>
              <Box sx={TextFieldStyle}>
                <TextField
                  type="text"
                  placeholder="enter state"
                  value={state}
                  label="State"
                  onChange={(e) => setState(e.target.value)}
                />
                <TextField
                  type="text"
                  placeholder="enter pincode"
                  label="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Box>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="landmark">
                <Form.Label>Landmark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="female" name="gender" control={<Radio />} onChange={(e) => setGender(e.target.value)} label="Female" />
                  <FormControlLabel value="male" name="gender" control={<Radio />} onChange={(e) => setGender(e.target.value)} label="Male" />
                  <FormControlLabel value="other" name="gender" control={<Radio />} onChange={(e) => setGender(e.target.value)} label="Other" />
                </RadioGroup>
              </FormControl>
              {/* <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>COnfirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button sx={{ marginRight: "15px" }} onClick={handleClose} type="submit" variant="contained" color="error">
                  Cancle
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Update
                </Button>
              </Box>
            </Form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileScreen;
