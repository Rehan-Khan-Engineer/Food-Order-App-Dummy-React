import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//following 2 are helper funcs for validation
const isEmpty = (value) => value.trim() === "";
const isFourChars = (chars) => chars.trim().length === 4;

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameValidity = !isEmpty(enteredName);
    const streetValidity = !isEmpty(enteredStreet);
    const postalCodeValidity = isFourChars(enteredPostalCode);
    const cityValidity = !isEmpty(enteredCity);

    setFormIsValid({
      name: nameValidity,
      street: streetValidity,
      postalCode: postalCodeValidity,
      city: cityValidity,
    });

    //validation of order form
    const formIsValid =
      nameValidity && streetValidity && postalCodeValidity && cityValidity;

    if (!formIsValid) {
      return;
    }

    //passing user Entered Data to cart.js
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameClasses = `${classes.control} ${
    !formIsValid.name ? classes.invalid : ""
  }`;

  const streetClasses = `${classes.control} ${
    !formIsValid.street ? classes.invalid : ""
  }`;
  const postalCodeClasses = `${classes.control} ${
    !formIsValid.postalCode ? classes.invalid : ""
  }`;
  const cityClasses = `${classes.control} ${
    !formIsValid.city ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formIsValid.name && (
          <p className={classes.error}>Please enter a valid Name!</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formIsValid.street && (
          <p className={classes.error}>Please enter a valid Street!</p>
        )}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formIsValid.postalCode && (
          <p className={classes.error}>Please enter a 4-digit postal code!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formIsValid.city && (
          <p className={classes.error}>Please enter a valid City!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
