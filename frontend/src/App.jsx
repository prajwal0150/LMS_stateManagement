import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from './page/Landing';
import Dashboard from './page/Dashboard';
import AddBook from './components/AddBook';
import UpdateBook from './components/updateBook';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element ={<Landing/>}/>
            <Route path="/Books" element={<Dashboard/>}/>
            <Route path="/BooksAdd" element={<AddBook/>}/>
            <Route path="/Books/edit/:id" element={<UpdateBook/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
