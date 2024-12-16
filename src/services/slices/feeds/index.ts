import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  selectedOrder: TOrder | null;
  isLoading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  selectedOrder: null,
  isLoading: false
};

export const getFeeds = createAsyncThunk(
  'ingredients/getFeeds',
  async () => await getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'ingredients/getFeed',
  async (number: number) => await getOrderByNumberApi(number)
);

export const slice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  selectors: {
    getAllFeeds: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getSelectedFeed: (state) => state.selectedOrder,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
export const {
  getAllFeeds,
  getTotal,
  getTotalToday,
  getSelectedFeed,
  getIsLoading
} = slice.selectors;
export const { clearSelectedOrder } = slice.actions;
export const feedsReducer = slice.reducer;
