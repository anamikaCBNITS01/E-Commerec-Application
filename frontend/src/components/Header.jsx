import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { useHistory, useLocation } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import SearchScreen from "../screens/SearchScreen";
import { SearchProducts } from "../actions/productActions";
import { Button, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../screens/Sidebar";
import SideBar from "../screens/Sidebar";


const style = {
  backgroundColor: "white",
  border: "none",
  display: "box",
  width: "50%",
}

const Header = ({ match }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickOpen = () => {
    setShowModal(true)
  }


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const history = useHistory();

  const RedirectHome = () => {
    history.push('/')
    window.location.reload();
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1.0),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1.0),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  const { pathname } = useLocation();
  const [input, setInput] = useState('')

  useEffect(() => {
    const searchText = input;
    dispatch(SearchProducts(input));
  }, [dispatch, match]);
  const handleUserLogout = () => {
    logout(history)(dispatch);
  };

  const onChseattff = () => {
    const searchText = input;
    dispatch(SearchProducts(input));
    console.log("value", input)
  };


  const onSearch = () => {
    const searching = dispatch(SearchProducts(input));
    if (searching) {
      history.push(`/search/${input}`)
    } else {
      return <div>Result Not Found</div>
    }
  };

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <div>
            <div onClick={() => setShowModal(true)} style={{cursor:"pointer",color:"white"}}><MenuIcon /></div>
        </div>
        <Container>
          <LinkContainer onClick={RedirectHome} to="/">
            <Navbar.Brand>Shopping Mart</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            {/* <input
              style={{ width: 350 }}
              placeholder="Search Contacts"
              onChange={(e) => setInput(e.target.value)}
              name="product"
              type="search"
            /><button type="submit" onClick={onChseattff}>Search</button> */}
            <TextField
              sx={style}
              variant="standard"
              type="text"
              placeholder="Search..."
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              value={input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ paddingLeft: "5px" }} />
                  </InputAdornment>
                ),
              }}
            /><Button onClick={onSearch} variant="contained" color="success" sx={{ p: 0.5 }}>Search</Button>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  &nbsp; cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    &nbsp; singin
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <SideBar open={showModal} onClose={()=>setShowModal(false)}/>
    </>
  );
};

export default Header;
