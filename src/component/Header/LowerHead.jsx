import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";



import MenuIcon from "@mui/icons-material/Menu";
import classes from "./Header.module.css";
function LowerHead() {
  return (
    <section>
      <div className={classes.lowerHeaderContainer}>
        <ul>
          <li className={classes.menu}>
            <AiOutlineMenu size={15} color="white" />

            <span className={classes.All}>
              <a href="/">All</a>
            </span>
          </li>
          <li>
            <a href="">Today's Deals</a>
          </li>
          <li>
            <a href="">Registry</a>
          </li>
          <li>
            <a href="">Prime Video</a>
          </li>
          <li>
            <a href="">Gift Cards</a>
          </li>
          <li>
            <a href="">Customer Service</a>
          </li>
          <li>
            <a href="">Sell</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default LowerHead
