import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Introduction } from '@/types'

// Define the initial state using that type
const initialState: Introduction = {
  name:"Anish Singh Chandel",
  designation: "Full-Stack Developer",
  about: "Versatile full-stack developer skilled in frontend, backend, databases, and deployment.",
  profileImage: "/anishIMG.jpg"
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