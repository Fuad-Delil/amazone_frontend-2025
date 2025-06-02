import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat.jsx/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDescription,renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  // console.log(state);
  const addToCart = () =>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  }

  return (
    <>
      <section
        className={`${classes.card__container} ${
          flex ? classes.product__flexed : " "
        }`}
      >
        <Link to={`/products/${id}`}>
          <img src={image} alt="" />
        </Link>
        <div>
          <div>
            <h3>{title}</h3>
            {renderDescription && <div>{description}</div>}
          </div>
          <div className={classes.rating}>
            {/* {rating} */}
            <Rating value={rating?.rate} precision={0.1} />
            {/* count */}
            <small>{rating?.count}</small>
          </div>
          <div className={classes.price}>
            {/* {price} */}
            <CurrencyFormat amount={price} />
          </div>

          {renderAdd && (
            <div>
              <button className={classes.button} onClick={addToCart}>
                add to cart
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductCard;
