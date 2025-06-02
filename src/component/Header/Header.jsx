import React, { useContext } from "react";
import amazonLogo from "./../../assets/amazon_PNG11.png";
import USAflag from "../../assets/USA_Flag.jpeg";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import classes from "./Header.module.css";
import LowerHead from "./LowerHead";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utility/firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(basket.length)

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section className={classes.outerContainer}>
        <div className={classes.innerContainer}>
          <div className={classes.Logo}>
            <Link to="/">
              <img src={amazonLogo} alt="amazone_logo" />
            </Link>
            <div className={classes.location_container}>
              <span className={classes.location}>
                <CiLocationOn />
              </span>
              <div className={classes.delivered_text}>
                <p> Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.inputSection}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search Product" />
            <span>
              <IoSearchOutline />
            </span>
          </div>
          <div className={classes.flag}>
            <img src={USAflag} alt="" />
            <p>EN </p>
            
          </div>
          <div className={classes.cart_side}>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p> hello, {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>hello,Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/Orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cartContainer}>
              <MdOutlineShoppingCart className={classes.cart_Icon} />
              <span className={classes.cartCounter}>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHead />
    </section>
  );
}

export default Header;
