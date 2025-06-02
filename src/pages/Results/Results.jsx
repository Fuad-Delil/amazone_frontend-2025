import React, { useEffect, useState } from "react";
import LayOut from "../../component/LayOut/LayOut";
import { useParams } from "react-router-dom";
import classes from "./Results.module.css";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../component/Product/ProductCard";
import Loader from "../../component/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();
  // console.log(categoryName);

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)

      .then((res) => {
        // console.log(res.data);
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err >>>>>> ", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <LayOut>
        {isLoading ? (
          <Loader />
        ) : (
          <section>
            <p className={classes.Category}> {categoryName}</p>
            <hr />
            <div className={classes.products_container}>
              {results?.map((Product) => (
                <ProductCard key={Product.id} renderAdd={true} product={Product} />
              ))}
            </div>
          </section>
        )}
      </LayOut>
    </div>
  );
}

export default Results;
