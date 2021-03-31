import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setloggedInUser] = useState([]);
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setloggedInUser]}>
        <Router>
          <Switch>
            <Route path="/login">
              <Header/>
              <Login/>
            </Route>
            <PrivateRoute path="/checkout/:id">
              <Header />
              <Checkout/>
            </PrivateRoute>
            <PrivateRoute path="/admin/addProduct">
              <Admin/>
            </PrivateRoute>
            <PrivateRoute path="/admin/dashboard">
              <Admin />
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Header />
              <Orders/>
            </PrivateRoute>
            <Route exact path="/">
              <Header />
              <Home/>
            </Route>
            <Route path="*">
              <Header/>
              <h1 className="text-center">404 Page Not Found</h1>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;