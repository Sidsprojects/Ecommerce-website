import React from 'react'
import { Link } from 'react-router-dom'
import ReactStarts from "react-rating-stars-component"
import "./Card.css"

const options = {
  edit: false,
  color: "grey",
  activeColor: "black",
  value:2.5,
  isHalf:true,
}
const Card = ({ product }) => {
  return (
    <Link className='Card' to={product.id}>
      <img src={product.images[0].url} alt="product-image" width={200} height={100}/>
      <h4>{product.name}</h4>
      <p>description:- Lorem, ipsum dolor.</p>
      <p><ReactStarts {...options}/></p>
      <p>Price:- {product.price}</p>
      {/* <div className="purchase-buttons">
        <button>Buy Now</button>
        <button>Add to Cart</button>
      </div> */}
    </Link>
  )
}

export default Card
