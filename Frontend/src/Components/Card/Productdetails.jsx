import React, { useEffect } from 'react'
import "./Productdetails.css"
import Carousel from "react-material-ui-carousel";
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom';
// import { Rating } from "@material-ui/lab";
import Rating from "react-rating-stars-component"
import ReviewCard from "./ReviewCard" 
import Loader from "../Loader/Loader"
import {useAlert} from "react-alert"


const Productdetails = () => {
    const {id} = useParams()
    const alert = useAlert()
    const dispatch = useDispatch()
    const {product,loading,error} = useSelector((state)=> state.productDetails)
    useEffect(() => {
        if(error) {
          alert.error(error)
          dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch,id])

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

  return (
    <>
    {loading ? <Loader/>: (
      <>
        <div className='ProductDetails' href="#container">
                <Carousel className='carousel'>
                {product.images && product.images.length > 0 ? (
                                product.images.map((item, i) => (
                                    <img className="Carouselimage" src={item.url} key={i} alt={`${i} Slide`} />
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                </Carousel>

            <div className='productinfo'>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number" value="1" style={{color: "black",paddingLeft: "22px",fontSize: "16px",width: "2vmax"}}/> 
                    <button>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:-
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Product Description :- <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
            </div>
        </div>
        <div className='reviewsHeading'>
            REVIEWS
        </div>

        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </>
    )}
    </>)}

export default Productdetails
