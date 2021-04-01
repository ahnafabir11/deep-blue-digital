import './Admin.css';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import logo from '../../images/logo.png';
import Dashboard from '../Dashboard/Dashboard';
import AddProductCard from '../AddProductCard/AddProductCard';


function Admin() {
  return (
    <div className="Admin">
      <div className="container-fluid">
        <img src={logo} alt="deep blue digital logo" className="side-nav-logo" />

        <div className="row align-items-start py-5">
          <div className="col-lg-3">
            <div className="side-nav">
              <div>
                <Link to="/" className="admin-link-text"><FaHome/> Home Page</Link>
                <Link to="/admin/dashboard" className="admin-link-text"><MdDashboard/> Dashboard</Link>
                <Link to="/admin/addProduct" className="admin-link-text"><AiOutlineAppstoreAdd/> Add Product</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <Route path="/admin/addProduct">
              <AddProductCard/>
            </Route>
            <Route path="/admin/dashboard">
              <Dashboard/>
            </Route>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;