import { useCallback, useReducer } from "react";

//hooks are a special function. if you change anything in the function that impacts the state, react re renders the component
//that uses the hook
//hooks always start with use

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          //which we want to update based on action
          formIsValid = formIsValid && action.isValid; // true && true
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,

          //we would see  either title or description here and then update their value and isValid
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid // overall validity of the form
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };

    default:
      return state;
  }
};
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    //this is the initial state and we need to update it in the formReducer based on the actions we receive
    inputs: initialInputs,
    isValid: initialFormValidity
  }); //isVlaid is whether the overall form is valid

  //this function is created everytime the component rerenders. we useCallback to define dependencies on which it should rerender
  //to avoid infinite loop
  //we wanna manage validity and values of the input in this function of the entire form
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      //dispatch are the actions
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []); //no dependencies means if we re render component
  //this function is reused it doesn't create a new function

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
