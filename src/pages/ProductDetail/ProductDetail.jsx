import React, { useEffect, useState } from "react";
import LayOut from "../../component/LayOut/LayOut";
import classes from "./ProductDetail.module.css";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/Product/ProductCard";
import Loader from "../../component/Loader/Loader";
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err>>>>>", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <LayOut>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductCard
            product={product}
            renderAdd={true}
            flex={true}
            renderDescription={true}
          />
        )}
      </LayOut>
    </div>
  );
}

export default ProductDetail;
