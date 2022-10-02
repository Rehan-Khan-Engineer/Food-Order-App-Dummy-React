import classes from "./HeaderCartButton.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

//the cart button in header contains cart icon,cart text and current items number
//badge.
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((prevValue, curValue) => {
    return prevValue + curValue.amount;
  }, 0);

  //useEffect() hook is used here to play bump animation on botton whenever
  // numberOfCartItems changes

  useEffect(() => {
    //following if check makes sure no anim is played if cart is empty
    if (cartCtx.items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    //following timer removes bump class which makes it possible for btn to bump
    //whenever user clicks +Add button(because it(bump class) gets added again)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //following cleanup function removes any old timer and makes sure our timer
    //starts new whenever button is clicked.
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <FaCartPlus />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
