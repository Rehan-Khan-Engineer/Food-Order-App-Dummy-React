import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault(); //reloading the page is prevented
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; //converting string num to num num
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber); //forwarding user input data to other
    //component (here it is MealItem.js)
  };

  //the input component below is custom and reusable and saved in UI folder
  //in the input component below we are adding built in attributes like step, min,
  //max etc. in the form of object pair, only to pass it to  <input {...props.input} />
  //there these attributes will be effective as they are built in input attributes
  //applied on built in html input element there!
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, //this creates a unique id per input item
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;
