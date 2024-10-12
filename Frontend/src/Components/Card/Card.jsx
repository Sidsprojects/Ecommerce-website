  import React from 'react'
  import { Link } from 'react-router-dom'
  import ReactStarts from "react-rating-stars-component"
  import "./Card.css"

  
  const Card = ({ product }) => {
    const options = {
      edit: false,
      color: "grey",
      activeColor: "black",
      value:product.rating,
      isHalf:true,
    }
    // console.log(product)
    return (
      <Link className='Card' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt="product-image" width={150} height={100}/>
        <h4>{product.name}</h4>
        <p className='description'>{product.description}</p>
        
        <ReactStarts {...options}/><span>{product.numOfReviews} reviews</span>
        <p className='price'>₹{product.price}</p>
        {/* <div className="purchase-buttons">
          <button>Buy Now</button>
          <button>Add to Cart</button>
        </div> */}
      </Link>
    )
  }

  export default Card
