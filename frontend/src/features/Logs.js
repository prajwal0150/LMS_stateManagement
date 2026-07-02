import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://library-api-9h9j.onrender.com/api";
// Read action 
export const fetchLogs = createAsyncThunk("logs/fetchLogs", async (Bookid, { getState, rejectWithValue }) => {
    try {
              const token = getState().auth.token;

        const response = await fetch(`${BASE_URL}/my-borrows/`,{
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch logs");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch data from server');
    }
});

// Add log action
export const addLog = createAsyncThunk("logs/addLog", async ({ book_id, logForm }, {getState, rejectWithValue }) => {
    try {
         const token = getState().auth.token;

        const response = await fetch(`${BASE_URL}/borrow/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(logForm ?? { book_id })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.detail || "Failed to add log");
        }
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to Add log');
    }
});

// Return book log action 
export const returnBookLog = createAsyncThunk("logs/returnBookLog", async ({ Bookid, logId, updatedLog }, { getState,rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const response = await fetch(`${BASE_URL}/return/ `, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedLog)
        });
        if (!response.ok) {
            throw new Error("Failed to update log");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to update log');
    }
});

export const LogsDetail = createSlice({
    name: "Loogs",
    initialState: {
        loogs: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            // fetchLogs
            .addCase(fetchLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.loogs = action.payload;
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addLog
            .addCase(addLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLog.fulfilled, (state, action) => {
                state.loading = false;
                state.loogs.push(action.payload);
            })
            .addCase(addLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // returnBookLog
            .addCase(returnBookLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(returnBookLog.fulfilled, (state, action) => {
                state.loading = false;
                state.loogs = state.loogs.map((log) =>
                    log.id === action.payload.id ? action.payload : log
                );
            })
            .addCase(returnBookLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default LogsDetail.reducer;