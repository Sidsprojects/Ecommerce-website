import React from 'react'
import "./Cardcontainer.css"
import Card from '../Card/Card'

const Cardcontainer = ({ products }) => {
  // console.log(products[0],products[1])
  return (
    <div className="cards-container" >
      <h1 id='container'>Browse Products:-</h1>
      <div className="cards">
        {/* <Card product={products[0]}/>
        <Card product={products[1]}/>
        <Card product={products[2]}/>
        <Card product={products[1]}/>
        <Card product={products[0]}/>
        <Card product={products[2]}/>
        <Card product={products[0]}/>
        <Card product={products[1]}/>
        <Card product={products[2]}/>
        <Card product={products[1]}/>  */}

        {products && products.map(product=>(
          <Card product={product} key={product._id}/>
        ))}
      </div>
    </div>
  )
}

export default Cardcontainer