import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Login from "../page/Login";
import { jwtDecode } from "jwt-decode";

//deployed backend link
const BASE_URL = "https://library-api-9h9j.onrender.com/api";

//register user
export const register = createAsyncThunk("auth/register/", async (datauser, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: datauser.Email,
                username: datauser.UserName,
                password: datauser.Password,
                first_name: datauser.FirstName,
                last_name: datauser.lastName
            })
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return rejectWithValue(errorData.message || "Registration failed");
        };
        const result = await res.json();
        console.log("User register succeed!")
        return result;

    } catch (error) {
        return rejectWithValue(error.message || "Network error. Failed to register user.")
    }
})

//login 
export const login = createAsyncThunk("auth/login", async (credential, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                username: credential.Email,
                password: credential.Password
            })
        });
        const result = await res.json();
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return rejectWithValue(errorData.message || "Invalid email or password");
        }

        console.log("User login succeed!")
        localStorage.setItem("token", result.access);
        localStorage.setItem("currentUser", JSON.stringify(result.user || result))
        return result;

    } catch (error) {
        return rejectWithValue(error.message || "failed to user login");
    }
})


//thirt party login
export const loginwithgoogle = createAsyncThunk("auth/googleLogin", async (googleCredentialToken, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/google-login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_token: googleCredentialToken }),
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || "Google authentication failed on server");

        }
        localStorage.setItem("token", result.access);
        localStorage.setItem("currentUser", JSON.stringify(result.user || result));
        return result;

    } catch (err) {
        return rejectWithValue(err.message || "Google login failed");
    }
})

///logout action
export const apiLogout = createAsyncThunk("auth/apiLogout", async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().UserAuth?.token || getState().auth?.token;;
        const res = await fetch(`${BASE_URL}/logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        localStorage.clear();
        return true;
    } catch (err) {
        localStorage.clear();
        return rejectWithValue(err.message || "Server logout error");

    }
})








export const UserAuth = createSlice({
    name: "UserAuth",
    initialState: {
        users: [],
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,


    },
    reducers: {
        addToken: (state) => {
            state.token = localStorage.getItem("token")
        },
        addUser: (state) => {
            state.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        },
        logout: (state) => {
            state.token = null;
            state.currentUser = null;
            localStorage.clear();
        }

    },

    extraReducers: (builder) => {
        builder
            //redux toolkit for user register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(apiLogout.fulfilled, (state) => {
                state.token = null;
                state.currentUser = null;
                state.loading = false;
            })
            //matches login manual and google
            .addMatcher(
                (action) => [login.pending.type, loginwithgoogle.pending.type].includes(action.type),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => [login.fulfilled.type, loginwithgoogle.fulfilled.type].includes(action.type),
                (state, action) => {
                    state.loading = false;
                    state.currentUser = action.payload;
                    state.token = action.payload.access;
                }
            )
            .addMatcher(
                (action) => [login.rejected.type, loginwithgoogle.rejected.type].includes(action.type),
                (state, action) => { state.loading = false; state.error = action.payload; }
            )





        // .addCase(login.pending,(state)=>{
        //     state.loading=true;
        //     state.error=null;

        // })
        // .addCase(login.fulfilled,(state, action)=>{
        //     //  state.users =users;
        //     state.loading=false;
        //      state.currentUser=action.payload;
        //     state.token = action.payload.accessToken;
        // })
        // .addCase(login.rejected,(state, action)=>{
        //     state.loading=false;
        //     state.error=action.payload;
        // })
    }
})
export const { logout } = UserAuth.actions;
export default UserAuth.reducer