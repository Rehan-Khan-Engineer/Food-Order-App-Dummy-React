import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assests/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

//header component contains header (project name and headerCartButton)  and image
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Khan Meals </h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
