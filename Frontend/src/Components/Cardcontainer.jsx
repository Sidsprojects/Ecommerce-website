import React from 'react'
import "./Cardcontainer.css"
import Card from './Card'

const Cardcontainer = ({ product }) => {
  return (
    <div className="cards-container" >
      <h1 id='container'>Browse Products:-</h1>
      <div className="cards">
        <Card product={product}/>
        <Card product={product}/>
        <Card product={product}/>
        <Card product={product}/>
        <Card product={product}/>
        <Card product={product}/>
        <Card product={product}/> 
      </div>
    </div>
  )
}

export default Cardcontainer
