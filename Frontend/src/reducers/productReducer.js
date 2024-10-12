// import { act } from "react";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducers =
  (state = { products: [] },action) => {
    switch (action.type) { 
      case ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productCount: action.payload.productCount,
          productsPerPage: action.payload.resultsPerPage,
        };
      case ALL_PRODUCT_FAIL:
        return {    
          loading: false,
          product: action.payload,
        };
      case CLEAR_ERRORS:
            return {    
              ...state,
              error: null,
            }
      default:
        return state;
    }
  };

  export const productdetailsReducers =
  (state = { product: {} },action) => {
    switch (action.type) { 
      case PRODUCT_DETAIL_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAIL_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
      case PRODUCT_DETAIL_FAIL:
        return {    
          loading: false,
          product: action.payload,
        };
      case CLEAR_ERRORS:
            return {    
              ...state,
              error: null,
            }
      default:
        return state;
    }
  };