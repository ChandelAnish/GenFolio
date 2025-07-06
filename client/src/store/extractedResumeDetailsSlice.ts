import { ExtractedData } from "@/utils/pdfExtractor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: ExtractedData = {
  text: "",
  links: [],
  phoneNumbers: [],
  metadata: {
    fileName: "",
    fileSize: 0,
    fileType: "",
  },
  profileImage:"/defaultUserImage.png",
  resumeUrl: "",
};

export const extractedResumeDetailsSlice = createSlice({
  name: "extractedResumeDetails",
  initialState,
  reducers: {
    fillExtractedResumeDetails: (
      state,
      action: PayloadAction<ExtractedData>
    ) => {
      return action.payload;
    },
  },
});

export const { fillExtractedResumeDetails } =
  extractedResumeDetailsSlice.actions;

export default extractedResumeDetailsSlice.reducer;
