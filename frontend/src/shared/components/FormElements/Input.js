import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  //takes current state and action and we have to return a new state
  switch (
    action.type //use switch to determine which action
  ) {
    case "CHANGE": // we are waiting for a change action
      return {
        //we are returning a new state object
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

//htmlFor is same a for keyword in label tag
//element can be either textarea or input
const Input = props => {
  //useReducer returns two elements inputState(initial state) and dispatch(dispatch action to reducer which runs function
  // and returns new state to inputState)
  const [inputState, dispatch] = useReducer(inputReducer, {
    // userReducer takes second arguement which is initial state ex value =""
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  //useEffect allows to run logic when dependencies change will be used by newPlace to tell when input has been changed
  //we want to use when input value or validity changes
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //fires on every key hit
  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    }); //action which is type "CHANGE" and val is what the user enters
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    }); //action which is type "CHANGE" and val is what the user enters
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler} //when a user leaves an input field: user clicked into it then clicked out of it
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  //only add the class input is valid and input is touched
  //also only show the error text if the input state is touched is true
  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
