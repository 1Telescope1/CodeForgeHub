import { configureStore } from "@reduxjs/toolkit";
import userRducer from "./modules/user";
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual,
} from "react-redux";

const store = configureStore({
  reducer: {
    user: userRducer,
  },
});

type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const shallowEqualApp = shallowEqual;
export default store;
