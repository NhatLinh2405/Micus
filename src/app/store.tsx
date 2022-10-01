import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../redux/features/playerSlice";
import { shazamCoreAPI } from "../redux/services/shazamCore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		[shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
		player: playerReducer,
	},
	middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(shazamCoreAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
