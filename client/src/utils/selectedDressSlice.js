import { createSlice } from "@reduxjs/toolkit";

const selectedDressSlice = createSlice({
  name: "selectedDress",
  initialState: {
    selectedDressData: [], // Store historical selected dress data as objects
  },
  reducers: {
    updateSelectedDress: (state, action) => {
      // Create a new object to represent the selected dress data
      const newSelectedDressData = {
        selectedDressImg: action.payload.selectedDressImg,
        selectedDressId: action.payload.selectedDressId,
      };

      // Push the new data into the selectedDressData array
      state.selectedDressData.push(newSelectedDressData);
    },
    updateSelectedDressData: (state, action) => {
      // Remove the item from selectedDressData based on the productId
      state.selectedDressData = state.selectedDressData.filter(
        (dress) => dress.selectedDressId !== action.payload
      );
    },
  },
});

export const { updateSelectedDress, updateSelectedDressData } =
  selectedDressSlice.actions;

export default selectedDressSlice.reducer;
