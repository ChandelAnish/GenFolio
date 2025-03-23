import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./store";
import { ToolTechnology } from "@/types";

// Define the initial state using that type
const initialState: ToolTechnology[] = [
  {
    name: "",
    icon: "",
  }
];

export const toolsAndTechnologiesSlice = createSlice({
  name: "toolsAndTechnologies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fillToolsAndTechnologiesDetails: (
      state,
      action: PayloadAction<ToolTechnology[]>
    ) => {
      return action.payload;
    },
  },
});

export const { fillToolsAndTechnologiesDetails } =
  toolsAndTechnologiesSlice.actions;

export default toolsAndTechnologiesSlice.reducer;
