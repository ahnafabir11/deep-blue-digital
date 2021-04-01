import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { MdDelete } from 'react-icons/md';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://banana-shortcake-52587.herokuapp.com/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.reverse());
      })
  }, [products])

  const deleteProduct = (id) => {
    fetch(`https://banana-shortcake-52587.herokuapp.com/deleteProduct`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => { })
  }

  return (
    <div className="Dashboard">
      <Card>
        <Card.Body>
          <h3 className="pb-3">Dashboard</h3>
          <Table style={{ minWidth: '600px' }} responsive>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => {
                return (
                  <tr key={idx}>
                    <td>{product.name}</td>
                    <td>{product.price}$</td>
                    <td>
                      <IconButton aria-label="delete" color="secondary" onClick={() => deleteProduct(product._id)}>
                        <MdDelete />
                      </IconButton>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Dashboard;