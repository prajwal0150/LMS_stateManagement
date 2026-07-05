import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBook } from '../features/Books';
import { useNavigate } from 'react-router-dom';

export default function AddBook({ onClose}) {
    const [book, setBook]=useState({});
    const [error, setError]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [file , setfile]=useState(null);
    
        const getBookData = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
            });
            };
    const handlefile=(e)=>{
      if(e.target.files && e.target.files.length>0){
        const selectedFile=(e.target.files[0]);

         const imageTypes=['image/png', 'image/jpeg','image/jpg'];

      if(!imageTypes.includes(selectedFile.type)){
        setError("Invalid file format. Only PNG, JPG and JPEG are allowed");
        setfile3(null);
        e.target.value=null;
        return;
      }
      
     
      setError(null);
      setfile(selectedFile);
    }};

    const titleRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+$/;
    const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

          if (
              !book.title ||
              !book.author ||
              !book.isbn ||
              !book.total_copies
          ) {
              setError("All fields are required.");
              return;
          }

          // Book title validation
          if (!titleRegex.test(book.title)) {
              setError("Book title should contain only letters and spaces.");
              return;
          }

          // Quantity validation
          if (!numberRegex.test(book.total_copies)) {
              setError("Quantity must contain only numbers.");
              return;
          }
          const formDataPayload = new FormData();
          formDataPayload.append('title', book.title);
          formDataPayload.append('author', book.author);
          formDataPayload.append('isbn', book.isbn);
          formDataPayload.append('total_copies', Number(book.total_copies));
          formDataPayload.append('image', file); 

          try {
              await dispatch(
                addBook(formDataPayload)
              ).unwrap();

              alert("Book added successfully.");

              onClose();
              // navigate("/Books");

          } catch (err) {

              if (
                  err?.toLowerCase().includes("exist") ||
                  err?.toLowerCase().includes("already")
              ) {
                  setError("Book title already exists.");
              } else {
                  setError(err || "Failed to create book.");
              }
          }
      };
    
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">
      <div className='bg-white rounded-xl w-full  max-w-md p-5 shadow-xl'>

        {/* Header of form */}
        <div className='flex justify-between items-center mb-5'>
          <h2 className='font-semibold'> 
            
                Add Book
          </h2>
          <button className='text-red-400 text-xl cursor-pointer ' onClick={onClose}>✕ </button>
        </div>
        {error &&( 
          <p className="text-red-500 mb-3">
            {error}
          </p>)}
        {/* Form Page */}
        <div>
          <form className='space-y-3'
          onSubmit={handleSubmit}
          >
            <label className=''>
              Book Name
              <input type='text'
              placeholder='e.g: Programming Language'
              className='w-full bg-blue-50 p-2 roundend-lg'
              name='title'
              onChange={getBookData}
              />
              
            </label>
            <label className=''>
              Author
              <input type='text'
              placeholder='e.g: Brendan Eich'
              className='w-full bg-blue-50 p-2 roundend-lg'
              name='author'
              onChange={getBookData}
              />
              
            </label>
            <label className=''>
              Quantity
              <input type=''
              placeholder='e.g: 15'
              className='w-full bg-blue-50 p-2 roundend-lg'
              name='total_copies'
              onChange={getBookData}
              />
              
            </label>
            <label className=''>
              ISBN
              <input type='text'
              placeholder='e.g: 15'
              className='w-full bg-blue-50 p-2 roundend-lg'
              name='isbn'
              onChange={getBookData}
              />
              
            </label>
            <label className=''>
              Image Upload
              <input type='file'
              placeholder=''
              className='w-full bg-blue-50 p-2 roundend-lg'
              // name='file'
              onChange={handlefile}
              
              />
             {file && (
                <div className="mt-1 bg-green-50 border border-green-200 text-green-700 text-xs py-1.5 px-3 rounded-lg flex items-center justify-between">
                  <span className="truncate max-w-[250px] font-medium">📄 File: {file.name}</span>
                </div>
              )}
              
            </label>
            <div className='flex gap-3'>
              <button className='flex-1 bg-green-400 h-10 rounded-2xl cursor-pointer hover:bg-green-700 hover:text-white' 
              type='submit'
              >
                Save
                
              </button>
              
              <button className='flex-1 bg-red-400 h-10 rounded-2xl cursor-pointer hover:bg-red-700 hover:text-white' type='button '
              onClick={onClose}>
                Cancel
              
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
