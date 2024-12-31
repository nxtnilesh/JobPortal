import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: { allJobs: [] },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs.push(action.payload);
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
