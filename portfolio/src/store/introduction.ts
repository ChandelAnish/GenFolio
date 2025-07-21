import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './store'
import { Introduction } from '@/types'

// Define the initial state using that type
const initialState: Introduction = {
  name: "",
  designation: "",
  about:
    "",
  profileImage: "/defaultUserImage.png",
  resumeUrl: "",
}

export const introductionSlice = createSlice({
  name: 'introduction',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers:{
    fillIntroductionDetails:(state, action:PayloadAction<Introduction>)=>{
      return action.payload
    }
  }
})

export const { fillIntroductionDetails } = introductionSlice.actions

export default introductionSlice.reducer