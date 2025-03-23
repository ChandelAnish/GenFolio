import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { Connect } from "@/types";

// Define the initial state using that type
const initialState: Connect = {
  msg1: "",
  github: "",
  linkedin: "",
  mail: "",
  msg2: "",
};

export const connectSlice = createSlice({
  name: "connect",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillConnectDetails: (
      state,
      action: PayloadAction<Connect>
    ) => {
      return action.payload;
    },
  },
});

export const { fillConnectDetails } = connectSlice.actions

export default connectSlice.reducer;
