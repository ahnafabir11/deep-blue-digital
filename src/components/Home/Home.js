import './Home.css';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Home = ()=> {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.reverse());
      })
  })

  return (
    <div className="Home py-4">
      <div className="container">
        <div className="poduct-search-box">
          <TextField
            id="outlined-size-small"
            placeholder="search product...(disabled)"
            variant="outlined"
            size="small"
            disabled
          />
          <Button variant="contained" color="primary">search</Button>
        </div>
        <div className="all-products">
          {
            products.map((product, idx)=> {
              return (
                <Card className="custom-card" key={idx}>
                  <Card.Img variant="top" src={product.imgURL} />
                  <Card.Body>
                    <Card.Title className="custom-font-color">{product.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="custom-font-color">{product.price}$</h5>
                      <Button variant="contained" color="primary" onClick={()=> history.push(`/checkout/${product._id}`)}>Buy Now</Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home;