import { configureStore } from "@reduxjs/toolkit";
import authSlide from "./authSlice";
import jobSlice from "./jobSlice";
const store = configureStore({
  reducer: { auth: authSlide, job: jobSlice },
});

export default store;
