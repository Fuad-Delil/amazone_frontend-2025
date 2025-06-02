import React, { useContext } from "react";
import LayOut from "../../component/LayOut/LayOut";
import { DataContext } from "../../component/DataProvider/DataProvider";
import ProductCard from "../../component/Product/ProductCard";
import CurrencyFormat from "../../component/CurrencyFormat.jsx/CurrencyFormat";
import { Link } from "react-router-dom";
import Classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0); //0 here is to start counting

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <div>
      <LayOut>
        <section className={Classes.container}>
          <div className={Classes.cart__container}>
            <h2>Hello</h2>
            <h3> Your Shopping Basket</h3>
            <hr />
            {basket?.length === 0 ? (
              <>
                <br />
                <p>opps ! No items in your cart</p>
              </>
            ) : (
              basket?.map((item, i) => {
                return (
                  <section key={i} className={Classes.cart_product}>
                    <div>
                      <ProductCard
                        key={i}
                        product={item}
                        renderDescription={true}
                        renderAdd={false}
                        flex={true}
                      />
                    </div>

                    <div className={Classes.btn_container}>
                      <button
                        className={Classes.btn}
                        onClick={() => increment(item)}
                      >
                        <IoIosArrowUp size={30} />
                      </button>
                      <span>{item.amount}</span>
                      <button
                        className={Classes.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <IoIosArrowDown size={30} />
                      </button>
                    </div>
                  </section>
                );
              })
            )}
          </div>

          {basket?.length !== 0 && (
            <div className={Classes.subtotal}>
              <div>
                <p>subtotal({basket?.length} items)</p>
                <CurrencyFormat amount={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>this order contains a gift</small>
              </span>
              <Link to="/payments">continue to checkout</Link>
            </div>
          )}
        </section>
      </LayOut>
    </div>
  );
}

export default Cart;
