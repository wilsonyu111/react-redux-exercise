import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
  category: string;
  deliveryMethod: string;
}

interface ListState {
  list: Item[];
  isItemSelected: boolean;
  selectedItem: Item;
}

const initialState: ListState = {
  list: [],
  isItemSelected: false,
  selectedItem: {
    id: 0,
    name: "",
    category: "",
    deliveryMethod: "",
  },
};

export const grocerySlice = createSlice({
  name: "grocery",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      // Write a custom reducer that will remove an item from the list array
    },
    selectItem: (state, action: PayloadAction<number>) => {
      // Write a custom reducer that will select an item
    },
    deselectItem: (state) => {
      // Write a customer reducer that will deselect an item
    },
  },
});

// Export actions
export const { addItem } = grocerySlice.actions;

// Export reducer
export default grocerySlice.reducer;
