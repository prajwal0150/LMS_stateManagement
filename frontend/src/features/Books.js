import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://library-api-9h9j.onrender.com/api";

const normalizeBookPayload = (payload) => {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

  if (isFormData) {
    return { body: payload, isJson: false, id: undefined };
  }

  if (payload && typeof payload === "object" && typeof FormData !== "undefined" && payload.formDataPayload instanceof FormData) {
    return { body: payload.formDataPayload, isJson: false, id: payload.id };
  }

  const { id, formDataPayload, ...bookData } = payload ?? {};

  return {
    body: JSON.stringify(bookData),
    isJson: true,
    id,
  };
};

// show book
export const showBooks = createAsyncThunk("showBooks",async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/books/`);

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// add book
export const addBook = createAsyncThunk("books/addBook",async (formDataPayload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const { body, isJson } = normalizeBookPayload(formDataPayload);

      const response = await fetch(`${BASE_URL}/books/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isJson ? { "Content-Type": "application/json" } : {}),
        },
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to add book");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete book
export const deleteBook = createAsyncThunk("deleteBook",async (bookId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${BASE_URL}/books/${bookId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      // Return the deleted id
      return bookId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update book
export const updateBook = createAsyncThunk("updateBook",async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const normalizedPayload = normalizeBookPayload(payload);

      if (!normalizedPayload.id && normalizedPayload.id !== 0) {
        throw new Error("Book id is required");
      }

      const response = await fetch(`${BASE_URL}/books/${normalizedPayload.id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(normalizedPayload.isJson ? { "Content-Type": "application/json" } : {}),
        },
        body: normalizedPayload.body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to update book");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// redux toolkit slicers
const BookDetail = createSlice({
  name: "BookDetail",

  initialState: {
    books: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // showbook
      .addCase(showBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(showBooks.fulfilled, (state, action) => {
        state.loading = false;

        // Remove duplicate books
        state.books = action.payload.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b.id === book.id)
        );
      })

      .addCase(showBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const exists = state.books.some(
          (book) => book.id === action.payload.id
        );

        if (!exists) {
          state.books.push(action.payload);
        }
      })

      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => book.id !== action.payload
        );
      })

      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload;
      })

      // update
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
      })

      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default BookDetail.reducer;