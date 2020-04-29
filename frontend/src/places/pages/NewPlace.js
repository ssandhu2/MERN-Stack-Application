import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validators.js";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

//we make an input component that take text validators etc
const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      //this is the initial state and we need to update it in the formReducer based on the actions we receive

      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      }
    },
    false
  ); //isVlaid is whether the overall form is valid

  const placeSubmitHandler = event => {
    event.preventDefault(); //meaning that the default action that belongs to the event will not occur. ex button won't click
    //with form default action is submit won't happen
    console.log(formState.inputs); //whatever we type gets stores in the formState has a title, description and isvalid
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]} //returns object we want to make sure with require validator that value user enters
        // isn't empty. We are passing Require value to input component which will call validate function in validators.js
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />

      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]} //returns object we want to make sure with require validator that value user enters
        // isn't empty. We are passing Require value to input component which will call validate function in validators.js
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />

      <Input
        id="address"
        element="input"
        type="Address"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
