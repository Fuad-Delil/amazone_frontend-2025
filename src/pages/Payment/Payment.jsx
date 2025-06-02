import React, { useContext, useState } from "react";
import LayOut from "../../component/LayOut/LayOut";
import classes from "./payment.module.css";
import { DataContext } from "../../component/DataProvider/DataProvider";
import ProductCard from "../../component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../component/CurrencyFormat.jsx/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  // console.log(user);

  // total itmes
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1. backend || function ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // 2. client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // 3. after the confirmation --> save orders on firestore database and clear basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // console.log(paymentIntent);

      // empty the basket

      dispatch({ type: Type.EMPTY_BASKET});

      setProcessing(false);
      navigate("/orders",{state:{msg:"you have placed new orders"}})
    } catch (error) {
      console.log("error");
      setProcessing(false);
    }
  };

  return (
    <div>
      <LayOut>
        {/* header */}
        <div className={classes.payment__header}>
          checkout ({totalItem}) items
        </div>
        {/* payment method */}
        <section className={classes.payment}>
          {/* address */}
          <div className={classes.flex}>
            <h3>Delivery Addres</h3>
            <div>
              <div>{user?.email}</div>
              <div>addis ketema</div>
              <div>Ethiopia,addis ababa</div>
            </div>
          </div>
          <hr />

          {/* product */}
          <div className={classes.flex}>
            <h3>Review items and Delivery</h3>
            <div>
              {basket?.map((item, i) => (
                <ProductCard key={i} product={item} flex={true} />
              ))}
            </div>
          </div>
          <hr />
          {/* card form */}
          <div className={classes.flex}>
            <h3>Payment Methods</h3>
            <div className={classes.payment__card__container}>
              <div className={classes.payment_details}>
                <form action="" onSubmit={handlePayment}>
                  {/* card error */}
                  {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )}
                  {/* card input box */}
                  <CardElement onChange={handleChange} />

                  {/* price */}
                  <div className={classes.payment__price}>
                    <div>
                      <span style={{ display: "flex", gap: "20px" }}>
                        <p>Total Order |</p> <CurrencyFormat amount={total} />
                      </span>
                    </div>

                    <button type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>pleas wait...</p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </LayOut>
    </div>
  );
}

export default Payment;
