import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  productionData: [string, string];
}

export interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
