import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  const { transations, getTransaction } = useContext(GlobalContext);
  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        {transations.map((transations) => (
          <Transaction
            key={transations.id}
            transations={transations}
          ></Transaction>
        ))}
      </ul>
    </div>
  );
};
