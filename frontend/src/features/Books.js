import React from 'react'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//read action that means fetch to all books in a dashboard page
export const showBooks= createAsyncThunk("showBooks", async( _,{rejectWithValue})=>{
    console.log("comming from thunk")
    try{
        const response =  fetch("https://6a3771dbc105017aa638f78a.mockapi.io/Books");
        
        const result= (await response).json();
        return result;
    }catch(error){
        return rejectWithValue(error.response?.data?.message ||'Failed to fetch data from server')

    }
})

//Book add Action from the book form
 export const addBook= createAsyncThunk("addBook", async(data,{rejectWithValue})=>{
     
    try{
       
        const response= await fetch("https://6a3771dbc105017aa638f78a.mockapi.io/Books",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
        body:JSON.stringify(data)
        
        })

        const result =(await response).json();
        console.log("Succeed for book add")

        return result;
        
    }catch(error){
        return rejectWithValue(error.response?.data?.message ||'Failed to Add book ')
    }
 })
//delete book
export const deleteBook= createAsyncThunk("deleteBook", async (Bookid, {rejectWithValue})=>{
    try{
        const response= fetch(`https://6a3771dbc105017aa638f78a.mockapi.io/Books/${Bookid}`,
            {
                method:"DELETE"
            }
        );
        const result=(await response).json();
        return result;

    }catch(error){
        return rejectWithValue(error);

    }
})

//update book
export const updateBook=createAsyncThunk("updateBook", async (data, {rejectWithValue})=>{
    try{
        const response= await fetch(`https://6a3771dbc105017aa638f78a.mockapi.io/Books/${data.Bookid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const result= await response.json();
        console.log(" return response in json formate");
        return result;

    }catch(error){
        return rejectWithValue(error);

    }
})




export const BookDetail =createSlice ({
    name:"BookDetail",
    initialState:{
        books:[],
        loading:false,
        error:null,

    },
    extraReducers:(builder)=>{
        builder
        .addCase(showBooks.pending,(state)=>{
            state.loading=true;
            state.error=null;
        
        })
        .addCase(showBooks.fulfilled,(state, action)=>{
            state.loading=false;
            state.books=action.payload;
        })
        .addCase(showBooks.rejected,(state, action)=>{
            state.loading=false;
            state.error= action.payload
        })

        //add book
         .addCase(addBook.pending,(state)=>{
            state.loading=true;
            state.error=null;
        
        })
        .addCase(addBook.fulfilled,(state, action)=>{
            state.loading=false;
            state.books.push(action.payload);
        })
        .addCase(addBook.rejected,(state, action)=>{
            state.loading=false;
            state.error= action.payload
        })

        //delete book
        .addCase(deleteBook.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
         .addCase(deleteBook.fulfilled,(state, action)=>{
            state.loading=false;
            
            const {Bookid}=action.payload;
            if (Bookid){
                state.books=state.books.filter((ele)=>ele.Bookid !==Bookid)
            }
            console.log("delete action",action.payload)

        })
        .addCase(deleteBook.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        //update book
        .addCase(updateBook.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
            state.loading = false;
            state.books = state.books.map((book) =>
                book.Bookid === action.payload.Bookid ? action.payload : book
            );
            })
            .addCase(updateBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            })
        

    }
}) 



export default BookDetail.reducer;
