import './Login.css';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { UserContext } from './../../App';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from '../../firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Login = ()=> {
  const [,setloggedInUser] = useContext(UserContext);
  const [errorMessege, setErrorMessege] = useState('');

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = ()=> {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const newUser = {
          email: user.email,
          username: user.displayName,
          userImg: user.photoURL
        }
        setloggedInUser(newUser);
        setErrorMessege('');
        history.replace(from);
      }).catch((error) => {
        const errorMessage = error.message;
        setErrorMessege(errorMessage);
      });
  }

  const facebookLogin = ()=> {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        const user = result.user;
        const newUser = {
          email: user.email,
          username: user.displayName,
          userImg: user.photoURL
        }
        setloggedInUser(newUser);
        setErrorMessege('');
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessege(errorMessage);
      });
  }

  const githubLogin = ()=> {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(githubProvider)
      .then((result) => {
        const user = result.user;
        const newUser = {
          email: user.email,
          username: user.displayName,
          userImg: user.photoURL
        }
        setloggedInUser(newUser);
        setErrorMessege('');
        history.replace(from);
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(error);
        setErrorMessege(errorMessage);
      });
  }

  return (
    <div className="Login">
      <div className="container">
        <Card>
          <Card.Body>
            <h3 className="text-center pb-3">Login</h3>
            <div className="social-login" onClick={googleSignIn}>
              <div className="d-flex align-items-center">
                <FcGoogle style={{fontSize: '50px'}}/>
                <p className="mb-0 ml-auto mr-auto flex-grow">Continue With Google</p>
              </div>
            </div>
            <div className="social-login" onClick={facebookLogin}>
              <div className="d-flex align-items-center">
                <FaFacebook style={{ fontSize: '50px', color: 'blue' }} />
                <p className="mb-0 ml-auto mr-auto flex-grow">Continue With Facebook</p>
              </div>
            </div>
            <div className="social-login">
              <div className="d-flex align-items-center" onClick={githubLogin}>
                <FaGithub style={{ fontSize: '50px' }} />
                <p className="mb-0 ml-auto mr-auto flex-grow">Continue With GitHub</p>
              </div>
            </div>
            <p className="pt-3 text-center text-danger">{errorMessege}</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Login;