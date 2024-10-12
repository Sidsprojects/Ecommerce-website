import React, { useEffect } from 'react'
import Hero from '../Hero/Hero'
import Cardcontainer from '../CardContainer/Cardcontainer'
import MetaData from '../MetaData'
import { clearErrors, getProduct } from '../../actions/productActions'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import { useAlert } from "react-alert";
import { ScrollRestoration } from 'react-router-dom'





// const products = [{
//     name: "Peach tshirt",
//     images: [{url: "https://cdn.shopify.com/s/files/1/1367/5207/files/PowerT-Shirt-GSDesertBeige-A4A9Q-NBZJ-0284_d54d2d3b-87cc-4c13-9889-37471885998c_384x.jpg?v=1690107809"}],
//     price: 3000,
//     _id:"1234",
// },{
//   name: "Black shirt",
//   images: [{url: "https://cdn.shopify.com/s/files/1/1367/5207/files/MinimalSportsBraGSBlackB3A2J-BBBB2_384x.jpg?v=1718696763"}],
//   price: 3000,
//   _id:"1234",
// },
// {
//   name: "Black shirt",
//   images: [{url: "https://cdn.shopify.com/s/files/1/1367/5207/products/ARRIVALREGULARSST-SHIRT-NAVY.B_Edit_HK_CM_702ac16b-b624-4943-baa8-82daef995f7f_384x.jpg?v=1645131336"}],
//   price: 3000,
//   _id:"1234",
// }]
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch()
  const { loading,proderror, products,productCount } = useSelector((state) => state.products);
  useEffect(() => {
    if(proderror) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch,proderror,alert])
  
  return (
    <div>
     <MetaData title="Home page"/>
     {loading ? <Loader/>: <Hero/>}
     {loading ? <Loader/>: <Cardcontainer products={products}/>}
     
     
    </div>
  )
}

export default Home
