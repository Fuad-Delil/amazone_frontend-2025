import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res)
        setProducts(res.data);
        setIsLoading(false);
        // console.log(products);
      })
      .catch((err) => {
        // console.log("err >>>", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products.map((singleProduct) => {
            return (
              <ProductCard
                product={singleProduct}
                renderAdd={true}
                 key={singleProduct.id}
              />
            );
          })}
        </section>
      )}
    </div>

    
  );
}

export default Product;
