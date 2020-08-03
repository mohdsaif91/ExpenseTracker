import React, { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

//initialState
const initialState = {
  transations: [],
  error: null,
  loading: true,
};

//Create Context

export const GlobalContext = createContext(initialState);

//Provider component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //action
  async function getTransaction() {
    try {
      const res = await axios.get("/api/v1/transaction/");
      dispatch({
        type: "GET_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }
  async function deleteTransaction(id) {
    try {
      console.log(id);
      await axios.delete(`/api/v1/transaction/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }
  async function addTransaction(transations) {
    const config = {
      header: {
        "Content-Type": "appilcation/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/transaction", transations, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transations: state.transations,
        deleteTransaction,
        addTransaction,
        getTransaction,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
