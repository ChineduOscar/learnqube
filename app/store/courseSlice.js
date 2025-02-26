import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses, setLoading } = courseSlice.actions;
export default courseSlice.reducer;
