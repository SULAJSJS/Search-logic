import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProdacts', async (params) => {
  // console.log('keyword', word);
  const { limit, currentPage, word } = params;
  return await axios
    .get(`https://api.dev.tezsat.kg/product/v1/products/`, {
      params: {
        limit: limit,
        offset: currentPage,
        search: word,
      },
    })
    .then( (res) => {
      return res;
    });
});

export const fetchKeywords = createAsyncThunk('keywords/fetchKeywords', async (search) => {
  const response = await axios
    .get(`http://api.dev.tezsat.kg/product/v1/suggestions`, {
      params: {
        search: search,
      },
    })
    .then((res) => {
      return res;
    });
  return response.data.results;
});

const initialState = {
  data: [],
  keywords: [],
  isError: false,
  isLoading: true,
  currentPage: 0,
  keyword: '',
  searchValue: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.data = [...state.data, ...action.payload];
    },
    setKeywords(state, action) {
      state.keywords = action.payload;
    },
    setCurrentOffsetPage(state, action) {
      state.currentPage = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action) => {
      state.data = action.payload;
    },
    [fetchProducts.rejected.type]: (state) => {
      state.isError = true;
      state.isLoading = true;
    },
    [fetchProducts.pending]: (state) => {
      state.isError = false;
      state.isError = false;
    },

    // ------------------<keywords>-----------------------//

    [fetchKeywords.fulfilled.type]: (state, action) => {
      state.keywords = action.payload;
    },
    [fetchKeywords.rejected.type]: (state) => {
      state.isError = true;
      state.isLoading = true;
    },
    [fetchKeywords.pending]: (state) => {
      state.isError = false;
      state.isError = false;
    },
  },
});

export const { setProducts, setKeywords, setCurrentOffsetPage, setKeyword, setSearchValue } = productsSlice.actions;
export default productsSlice.reducer;
