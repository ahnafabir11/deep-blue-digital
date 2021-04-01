import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner, Table } from 'react-bootstrap';
import { UserContext } from '../../App';

const Orders = () => {
  const [loggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`https://banana-shortcake-52587.herokuapp.com/orders/${loggedInUser.email}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
      })
  }, [loggedInUser.email])

  return (
    <div className="container my-5">
      <Card>
        <Card.Body>
          <h3 className="pb-3">Your Orders</h3>
          <Table style={{ minWidth: '700px' }} responsive="lg">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Order Time</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => {
                return (
                  <tr>
                    <td>{order.name}</td>
                    <td>{order.price}$</td>
                    <td>{new Date(order.orderTime).toDateString()}</td>
                    <td className="text-info">Pending <Spinner animation="border" size="sm" /></td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Orders;