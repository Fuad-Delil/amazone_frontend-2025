import React from 'react'
import { FadeLoader } from 'react-spinners';

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "45vh",
      }}
    >
      <FadeLoader color="#1976d2" />
      <h5>Loading product details, please wait..</h5>
    </div>
  );
}

export default Loader
