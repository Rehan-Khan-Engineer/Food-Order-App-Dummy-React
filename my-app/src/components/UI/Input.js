import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  //{...props.input} makes sure that all the key-value pair in input object is
  // added as attribute in input element.
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
