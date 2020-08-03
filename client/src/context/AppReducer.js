export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTION":
      return {
        ...state,
        loading: false,
        transations: action.payload,
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_TRANSACTION":
      console.log(state.transations);
      return {
        ...state,
        transations: state.transations.filter(
          (tran) => tran._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transations: [...state.transations, action.payload],
      };

    default:
      return state;
  }
};
