import {React,useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productActions'
import Loader from "../Loader/Loader"
import Card from "./Card"
import MetaData from '../MetaData'
import Pagination from "react-js-pagination"
import "./Products.css"

const Products = () => {
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);

    const {error,loading,products,productCount,productsPerPage} = useSelector(state=> state.products)
    console.log("this is product count:- ",productCount)
    console.log("this is productperpage count:- ",productsPerPage)

    const setCurrentPageNo = (e) => {
      setCurrentPage(e);
    };

    useEffect(() => {
        dispatch(getProduct(currentPage))
    }, [useDispatch,currentPage])
    
  return (
    <>
      {loading ? <Loader/>: <>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <h2 className="productsHeading">Products</h2>

      <div className="products">
            {products &&    
              products.map((product) => (
                <Card key={product._id} product={product} />
              ))}
      </div>
      {productsPerPage < productCount && (
        <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productsPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
      )}
      
      </>}
    </>
  )
}

export default Products
