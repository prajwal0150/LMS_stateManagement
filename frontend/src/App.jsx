import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from './page/Landing';
import Dashboard from './page/Dashboard';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import Register from './page/Register';
import Login from './page/Login';
import ProtectedRouter from './components/ProtectedRouter';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element ={<Landing/>}/>
            
            <Route path="/register" element={<Register/>}/>
            <Route path="/User/Login" element={<Login/>}/>

            {/* protected route handle to unauthorization acces in URL */}
            <Route element={<ProtectedRouter/>}>
            <Route path="/Books" element={<Dashboard/>}/>
            <Route path="/BooksAdd" element={<AddBook/>}/>
            <Route path="/Books/edit/:id" element={<UpdateBook/>}/>
            </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
