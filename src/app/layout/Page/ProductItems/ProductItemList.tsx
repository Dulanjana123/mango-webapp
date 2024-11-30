
import { useState, useEffect } from "react";
import React from 'react'
import { productItemModel } from "../../../../types/interfaces";
import ProductItemCard from "./ProductItemCard";
import { useGetProductItemsQuery } from "../../../services/api/ProductItemService";
import { useDispatch } from "react-redux";
import { setProductItem } from "../../../store/Redux/productItemSlice";

function ProductItemList() {
//const [productItems, setProductItems] = useState<productItemModel[]>([]);

const dispatch = useDispatch();
const {data, isLoading} = useGetProductItemsQuery(null);

  useEffect(() => {
    if(!isLoading){
      dispatch(setProductItem(data))
    }
  }, [isLoading]);

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        {data.length > 0 && 
         data.map((productItem : productItemModel, index: number) => (
            <ProductItemCard productItem={productItem} key={index} />
        ))}
      </div>
    </div>);
}

export default ProductItemList