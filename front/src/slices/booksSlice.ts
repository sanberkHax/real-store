import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover_url: string;
  pages: number;
  price: number;
  currency: string;
}

export interface BooksState {
  books: Book[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BooksState = {
  books: [],
  status: 'idle',
};

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await fetch('http://localhost:3001/api/book?page=1');
  const books = await response.json();
  return books.data;
});

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.status = 'idle';
      })
      .addCase(getBooks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectBooks = (state: RootState) => state.books.books;

export default booksSlice.reducer;
