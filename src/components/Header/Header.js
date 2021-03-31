import './Header.css';
import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import logo from '../../images/logo.png';
import Button from '@material-ui/core/Button'
import { UserContext } from '../../App';
import { Avatar } from '@material-ui/core';

const Header = ()=> {
  const history = useHistory();
  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  return (
    <div className="Header">
      <Navbar expand="md">
        <div className="container">
          <Navbar.Brand>
            <img src={logo} alt="deep blue digital logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto align-items-md-center">
              <Link to="/" className="nav-link-text">Home</Link>
              <Link to="/orders" className="nav-link-text">Orders</Link>
              <Link to="/admin/dashboard" className="nav-link-text">Admin</Link>
              {
                loggedInUser.email ? 
                  <div className="custom-logout-btn bg-danger" onClick={() => setloggedInUser([])}>
                    Log Out <Avatar alt={loggedInUser.username} src={loggedInUser.userImg} />
                  </div> :
                  <Button variant="contained" color="primary" className="ml-md-3" onClick={() => history.push('/login')}>Login</Button>
              }
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  )
}

export default Header;