import { configureStore } from '@reduxjs/toolkit'
import introductionSliceReducer from './introduction'
import experienceSliceReducer from './experiences'
import projectsSliceReducer from './projects'
import toolsAndTechnologiesSliceReducer from './toolsAndTechnologies'
import connectSliceReducer from './connect'
import themeSliceReducer from './theme'

export const store = configureStore({
  reducer: {
    introduction: introductionSliceReducer,
    experiences: experienceSliceReducer,
    projects: projectsSliceReducer,
    toolsAndTechnologies: toolsAndTechnologiesSliceReducer,
    connect: connectSliceReducer,
    theme: themeSliceReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store