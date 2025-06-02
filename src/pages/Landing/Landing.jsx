import React from "react";
import CarouselEffect from "../../component/Carousel/Carousel";
import Category from "../../component/Category/Category";
import Product from "../../component/Product/Product";
import LayOut from "../../component/LayOut/LayOut";

function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
