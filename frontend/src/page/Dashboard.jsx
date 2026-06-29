
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, showBooks } from '../features/Books';
import { useEffect, useState } from 'react';
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa';
import AddBook from '../components/AddBook';
import BookView from '../components/BookView';
import { useNavigate } from 'react-router-dom';
import UpdateBook from '../components/updateBook';

const Dashboard = () => {
    
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {books, loading, error}=useSelector((state)=>state.app)
    const [id, setId]=useState();
    const [showPopup, setPopup]=useState(false);
    const [bookForm, setForm]=useState(false);


    useEffect(()=>{
        dispatch(showBooks())
    
    },[]);

    const openEditPage = (bookId) => {
      navigate(`/Books/edit/${bookId}`);
    };

 if (loading) {
        return (
            <div className=''>
                <Navbar />
                <div className='bg-white min-h-screen p-6 flex flex-col items-center justify-center gap-4'>
                    <div className='w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin' />
                    <p className='text-gray-500 font-serif text-sm'>Loading books...</p>
                </div>
            </div>
        )
    }
    if(error){
      return(
        <div className="container my-5 text-center">
                <div className="alert alert-danger role-alert mx-auto" style={{ maxWidth: "500px" }}>
                    <h4>⚠️ Server Error</h4>
                    <p className="mb-3">{error}</p>
                    {/* Retry button to give users a way out */}
                    <button 
                        className="btn btn-outline-danger btn-sm" 
                        onClick={() => dispatch(showBooks())}
                    >
                        Try Again
                    </button>
                </div>
            </div>
      )
    }

  return (
    <div className=' min-h-screen'>
      {showPopup && <BookView
      id={id}
      popup={showPopup}
      setpopup={setPopup}/>}

      

      
        <Navbar/>
      {/* Body part */}
        <div className=' bg-white min-h-screen p-6 rounded-lg shadows'>

          <div className='flex p-5  justify-between items-center mb-4 '>
            <h1 className='font-serif text-xl'>Available Books</h1>
            
             <button 
              className=' flex bg-blue-400 h-10 p-2 rounded-2xl cursor-pointer text-white hover:bg-blue-500'
              onClick={()=>{setForm(true)}}
              >+ Add Books
            </button>
          </div>
          
          <table className=" w-full text-left text-sm text-gray700 border">
            <thead className='bg-gray-100'>
              <tr>
                <td className="px-4 py-2">S.No</td>
                <td className="px-4 py-2">Books Name</td>
                <td className="px-4 py-2">Author</td>
                <td className="px-4 py-2">Quantity</td>
                <td className="px-4 py-2">Actions</td>
              </tr>
            </thead>
            <tbody>
              {books.map((item, index)=>{
                return(
                  <tr key={index}>
                    <td className='px-4 py-2'>{index+1}</td>
                    <td className='px-4 py-2'>{item.BookName}</td>
                    <td className='px-4 py-2'>{item.Author}</td>
                    <td className="px-4 py-2">{item.Quantity}</td>
                    <td className='px-4 py- flex gap-3'>
                      <FaEdit
                      title="Edit Book"
                      className="cursor-pointer text-green-500 hover:text-green-700 mt-3"
                      onClick={() => openEditPage(item.Bookid)}
                     />

                      <FaTrash
                      title="Delete Book"
                      className="cursor-pointer text-red-500 hover:text-red-700 mt-3"
                      onClick={()=> dispatch(deleteBook(item.Bookid))}
              />

                      <FaEye
                      title="View Book"
                      onClick={()=>[setId(item.Bookid), setPopup(true)]}
                      className="cursor-pointer text-yellow-500 mt-3 hover:text-yellow-700 inline-flex items-center justify-center rounded-2xl  text-sm font-semibold transition"
/>
                    </td>
                  </tr>
                )
              })} 
            </tbody>
          </table>

          

        </div>

        {/* Footer */}
        <footer className="bg-indigo-50/40 border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <p className="font-serif font-bold text-indigo-950">Scholarly LMS</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                    © 2024 Scholarly LMS. All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-6 text-sm text-indigo-700 font-medium">
                    <a href="#" className="hover:underline">
                    Privacy Policy
                    </a>
                    <a href="#" className="hover:underline">
                    Terms of Service
                    </a>
                    <a href="#" className="hover:underline">
                    Contact
                    </a>
                </div>
            </div>
        </footer>
        {bookForm&&(<AddBook
        
        onClose={()=>setForm(false)}
        />)}

        
    </div>
  )
}

export default Dashboard
