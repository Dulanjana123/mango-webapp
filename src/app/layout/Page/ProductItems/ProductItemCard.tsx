import React from 'react'
import { productItemModel } from '../../../../types/interfaces'
import { Link } from 'react-router-dom';


interface Props {
    productItem: productItemModel;
}

function ProductItemCard(props: Props) {
  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/productItemDetails/${props.productItem.id}`}> 
              <img
                src="https://via.placeholder.com/150"
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>

          <i
            className="bi bi-star btn btn-success"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            &nbsp; SPECIAL
          </i>

          <i
            className="bi bi-cart-plus btn btn-outline-danger"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          ></i>

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link 
                to={`/productItemDetails/${props.productItem.id}`}
                style={{textDecoration: "none"}}
              > 
                {props.productItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              category
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            Description
          </p>
          <div className="row text-center">
            <h4>${props.productItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItemCard