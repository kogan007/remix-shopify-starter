import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

type State = {
  cartOpen: boolean;
};

type Action = {
  type: "toggleCart" | "openCart" | "closeCart";
};
const uiContext = createContext<State | any>({ cartOpen: false });

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "toggleCart":
      return { ...state, cartOpen: !state.cartOpen };
    case "closeCart":
      return { ...state, cartOpen: false };
    case "openCart":
      return { ...state, cartOpen: true };
  }
};
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, { cartOpen: false });

  const toggleCart = () => dispatch({ type: "toggleCart" });
  const openCart = () => dispatch({ type: "openCart" });
  const closeCart = () => dispatch({ type: "closeCart" });
  const value = useMemo(
    () => ({
      ...state,
      toggleCart,
      openCart,
      closeCart,
    }),
    [state]
  );
  return <uiContext.Provider value={value}>{children}</uiContext.Provider>;
};

export const useUI = () => {
  const context = useContext(uiContext);
  return context;
};
