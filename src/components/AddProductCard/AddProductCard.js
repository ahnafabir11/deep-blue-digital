import './AddProductCard.css';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';

const AddProductCard = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [imgUrl, setImgUrl] = useState('');

  const handleImageUplaod = event => {
    const imageData = new FormData();
    imageData.set('key', 'f9cbd9763516a65f3b98eeb08b34baff');
    imageData.append('image', event.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(res => setImgUrl(res.data.data.display_url))
      .catch(error => { });
  }

  const onSubmit = (data) => {
    const productData = {
      name: data.productName,
      price: data.productPrice,
      imgURL: imgUrl
    }

    fetch(`https://banana-shortcake-52587.herokuapp.com/addProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    })
      .then(res => history.push('/'))
  }

  return (
    <div className="AddProductCard">
      <Card>
        <Card.Body>
          <h4 className="pb-3">Add New Product</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="productName" ref={register({ required: true })} />
              {errors.productName ? <span className="text-danger">Product Name Can't Be Empty</span> : ''}
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="number" name="productPrice" ref={register({ required: true })} />
              {errors.productPrice && <span className="text-danger">Product Name Can't Be Empty</span>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" name="productImg" ref={register({ required: true })} onChange={handleImageUplaod} />
              {errors.productImg ? <span className="text-danger">Product need an image</span> : ''}
            </Form.Group>

            {imgUrl === '' ?
              <Button variant="primary" type="submit" disabled>Submit</Button> :
              <Button variant="primary" type="submit">Submit</Button>
            }
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddProductCard;