import './Checkout.css';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Table, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';

const Checkout = ()=> {
  const [loggedInUser] = useContext(UserContext);
  const [product, setProduct] = useState({});
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
    .then(res => res.json())
    .then(data => {
      setProduct(data)
    })
  }, [id])

  const submitOrder = ()=> {
    const name = product.name;
    const price = product.price;
    const userEmail = loggedInUser.email;
    const orderTime = new Date();
    const newOrder = { name, price, userEmail, orderTime }

    fetch(`http://localhost:5000/addOrder`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newOrder)
    })
    .then(res => {
      history.push('/orders')
    })
  }
  
  return (
    <div className="Checkout">
      <div className="container py-5">
        <h2 className="custom-font-color">Checkout</h2>
        <Card>
          <Card.Body>
            <Table style={{minWidth: "500px"}} responsive>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: '2px solid gray'}}>
                  <td>{product.name}</td>
                  <td>01</td>
                  <td>{product.price}$</td>
                </tr>
                <tr>
                  <td></td>
                  <th>Total</th>
                  <td>{product.price}$</td>
                </tr>
              </tbody>
            </Table>
            <Button onClick={submitOrder}>Check Out</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Checkout;