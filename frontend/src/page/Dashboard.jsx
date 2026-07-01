
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, showBooks } from '../features/Books';
import { useEffect, useState } from 'react';
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa';
import AddBook from '../components/AddBook';
import BookView from '../components/BookView';
import { useNavigate } from 'react-router-dom';
import UpdateBook from '../components/UpdateBook';

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

    

    const openEditPage = (id) => {
      navigate(`/Books/edit/${id}`);
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
                            {Array.isArray(books) && books.length > 0 ? (
                                books.map((item, index) => {
                                    // const bookId = item.id || item.Bookid;
                                    // const bookTitle = item.title || item.BookName;
                                    // const bookAuthor = item.author || item.Author;
                                    // const bookQuantity = item.total_copies !== undefined ? item.total_copies : item.total_copies;

                                    return (
                                        <tr key={item.id || index} className="hover:bg-slate-50/80 transition-colors">
                                            <td className='px-4 py-2 font-medium '>{index + 1}</td>
                                            <td className='px-4 py-2 font-semibold '>{item.title}</td>
                                            <td className='px-4 py-2 '>{item.author}</td>
                                            <td className="px-4 py-2 ">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${item.total_copies > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                    {item.total_copies} Available
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 flex gap-4 '>
                                                <button 
                                                    onClick={() => openEditPage(item.id)}
                                                    className=" hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                                    title="Edit Book"
                                                >
                                                    <FaEdit className="cursor-pointer text-green-500 hover:text-green-700" />
                                                </button>

                                                
                        <FaTrash
                        title="Delete Book"
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this book?")) {
                            try {
                              await dispatch(deleteBook(item.id));
                              alert("Book deleted successfully!");
                              // Refresh the books list to reflect deletion
                              dispatch(showBooks());
                            } catch (err) {
                              alert(`Deletion failed: ${err}`);
                            }
                          }
                        }}
                        className="cursor-pointer text-red-500 hover:text-red-700" />
                                               

                                                <button 
                                                  onClick={() => { setId(item.id); setPopup(true); }}
                                                    className="  hover:text-amber-600 rounded-lg hover:bg-amber-50 transition"
                                                  title="View Book"
                                                >
                                                  <FaEye className="cursor-pointer text-yellow-500 hover:text-yellow-700 inline-flex items-center justify-center rounded-2xl  text-sm font-semibold transition" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-slate-400 font-medium bg-slate-50/30">
                                        No books available in the catalog.
                                    </td>
                                </tr>
                            )}
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
