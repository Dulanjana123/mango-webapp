import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductItemByIdQuery } from '../app/services/api/ProductItemService';
import {useState} from "react";    
import { toastNotify } from '../helper';
import { userModel } from '../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/Redux/store';

function ProductItemDetails() {
const {productItemId} = useParams();
const {data,isLoading} = useGetProductItemByIdQuery(productItemId)
const navigate = useNavigate();
const[quantity, setQuantity] = useState(1)

const userData : userModel = useSelector((state: RootState) => state.userAuthStore);

const handleQuantity = (counter: number) => {
  let newQuantity = quantity + counter
  if(newQuantity==0){
    newQuantity = 1;
  }
  setQuantity(newQuantity);
  return;
};

const handleAddToCart = async(productItemId: number) => {

  if(!userData.id) {
    navigate("/login");
    return;
  }

  toastNotify("Item added to cart successfully!");
};

return  <div className="container pt-4 pt-md-5">
{!isLoading? (
  <div className="row">
    <div className="col-7">
      <h2 className="text-success">{data.name}</h2>
      <span>
        <span
          className="badge text-bg-dark pt-2"
          style={{ height: "40px", fontSize: "20px" }}
        >
          CATEGORY
        </span>
      </span>
      <span>
        <span
          className="badge text-bg-light pt-2"
          style={{ height: "40px", fontSize: "20px" }}
        >
          SPECIAL TAG
        </span>
      </span>
      <p style={{ fontSize: "20px" }} className="pt-2">
        DESCRIPTION
      </p>
      <span className="h3">${data.price}</span> &nbsp;&nbsp;&nbsp;
      <span
        className="pb-2  p-3"
        style={{ border: "1px solid #333", borderRadius: "30px" }}
      >
        <i onClick={()=>{
          handleQuantity(-1);
        }}
          className="bi bi-dash p-1"
          style={{ fontSize: "25px", cursor: "pointer" }}
        ></i>
        <span className="h3 mt-3 px-3">{quantity}</span>
        <i onClick={()=>{
          handleQuantity(+1);
        }}
          className="bi bi-plus p-1"
          style={{ fontSize: "25px", cursor: "pointer" }}
        ></i>
      </span>
      <div className="row pt-4">
        <div className="col-5">
          <button className="btn btn-success form-control"
          onClick={() => {
            handleAddToCart(data.id)
          }}>
            Add to Cart
          </button>
        </div>

        <div className="col-5 ">
          <button className="btn btn-secondary form-control"
          onClick={()=>navigate(-1)}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
    <div className="col-5">
      <img
        src="https://via.placeholder.com/150"
        width="100%"
        style={{ borderRadius: "50%" }}
        alt="No content"
      ></img>
    </div>
  </div>):
   (<div
    className="d-flex justify-content-center"
    style={{width: "100%"}}>
    <div>Loading...</div>
    </div>)}
</div>;
}

export default ProductItemDetails