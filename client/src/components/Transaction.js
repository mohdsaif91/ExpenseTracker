import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const Transaction = ({ transations }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transations.amount < 0 ? "-" : "+";
  return (
    <div>
      <li className={transations.amount < 0 ? "minus" : "plus"}>
        {transations.text}
        <span>
          {sign}${numberWithCommas(Math.abs(transations.amount))}
        </span>
        <button
          onClick={() => deleteTransaction(transations._id)}
          className="delete-btn"
        >
          x
        </button>
      </li>
    </div>
  );
};
