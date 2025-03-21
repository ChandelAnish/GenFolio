import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { Connect } from "@/types";

// Define the initial state using that type
const initialState: Connect = {
  msg1: "Available for freelance work, innovative projects, and internship opportunities. Let's create something groundbreaking together!",
  github: "https://github.com/ChandelAnish",
  linkedin: "https://www.linkedin.com/in/as-chandel",
  mail: "anish8427singh@gmail.com",
  msg2: "Let's collaborate and build the future!",
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
