import { createContext, useReducer } from "react";

// Opret kontekst
export const StoreContext = createContext();

// Initial state
const initialState = {
  basket: [],
};

// Reducer funktion
function reducer(state, action) {
  switch (action.action) {
    case "EMPTY_BASKET":
      return { ...state, basket: [] };

    case "REMOVE_ONE_PRODUCT":
      const nextBasket = state.basket.map((item) => {
        if (item.id === action.payload.id) {
          const copy = { ...item };
          copy.amount--;
          return copy;
        } else {
          return item;
        }
      });
      return {
        ...state,
        basket: nextBasket.filter((item) => item.amount > 0),
      };

    case "ADD_PRODUCT":
      const exists = state.basket.find((item) => item.id === action.payload.id);
      if (exists) {
        const updatedBasket = state.basket.map((item) => (item.id === action.payload.id ? { ...item, amount: item.amount + 1 } : item));
        return { ...state, basket: updatedBasket };
      } else {
        const newItem = { ...action.payload, amount: 1 };
        return { ...state, basket: [...state.basket, newItem] };
      }

    default:
      return state;
  }
}

// StoreProvider komponent
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};
