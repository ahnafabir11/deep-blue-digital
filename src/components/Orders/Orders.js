import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../App';

const Orders = ()=> {
  const [loggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${loggedInUser.email}`)
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
          {
            orders.map((order, idx)=> {
              return(
                <Card key={idx} className="my-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>{order.name}</h5>
                      <h5>{order.price}$</h5>
                      <h5>{new Date(order.orderTime).toDateString()}</h5>
                      <h5 className="text-info">Pending</h5>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default Orders;