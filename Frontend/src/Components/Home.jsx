import React from 'react'
import Hero from './Hero'
import Cardcontainer from './Cardcontainer'
import MetaData from './MetaData'

const product = {
    name: "blue tshirt",
    images: [{url: "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt.jpg"}],
    price: 3000,
    _id:"1234",
}
const Home = () => {
  return (
    <div>
     <MetaData title="Home page"/>
     <Hero/>
     <Cardcontainer product={product}/>
    </div>
  )
}

export default Home
