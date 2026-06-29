import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBook } from '../features/Books'
import Navbar from './Navbar'

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.app);
  const [updateData, setUpdate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id ) {
      const singleBook = books.find((ele) => ele.Bookid === id);
      setUpdate(singleBook);
    }
  }, []);
  if(loading){
    return(<div className=''>
                <Navbar />

                <div className='bg-white min-h-screen p-6 flex flex-col items-center justify-center gap-4'>
                    <div className='w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin' />
                    <p className='text-gray-500 font-serif text-sm'>Loading books...</p>
                </div>
            </div>)
  }

  const newData = (event) => {
    setUpdate({
      ...updateData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateBook(updateData))
    navigate("/Books");
  };

  if (!updateData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-5">
        <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Update Book</h2>
          <p className="text-sm text-red-500">Book details are not available for this id.</p>
          <button
            type="button"
            className="mt-4 h-10 rounded-2xl bg-slate-900 px-4 text-white hover:bg-slate-700"
            onClick={() => navigate('/Books')}
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
        <Navbar/>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">
      <div className='bg-white rounded-xl w-full  max-w-md p-5 shadow-xl'>

        {/* Header of form */}
        <div className='flex justify-between items-center mb-5'>
          <h2 className='font-semibold'> 
            Update Book
          </h2>
          <button className='text-red-400 text-xl cursor-pointer ' onClick={() => navigate('/Books')}>✕ </button>
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
              className='w-full bg-blue-50 p-2 rounded-lg'
              name='BookName'
              value={updateData&& updateData?.BookName || ''}
              onChange={newData}
              />
              
            </label>
            <label className=''>
              Author
              <input type='text'
              placeholder='e.g: Brendan Eich'
              className='w-full bg-blue-50 p-2 rounded-lg'
              name='Author'
              value={updateData&& updateData?.Author || ''}
              onChange={newData}
              />
              
            </label>
            <label className=''>
              Quantity
              <input type='text'
              placeholder='e.g: 15'
              className='w-full bg-blue-50 p-2 rounded-lg'
              name='Quantity'
              value={updateData&& updateData?.Quantity || ''}
              onChange={newData}
              />
              
            </label>
            <div className='flex gap-3'>
              <button className='flex-1 bg-green-400 h-10 rounded-2xl cursor-pointer hover:bg-green-700 hover:text-white' 
              type='submit'
              >
                Done

              </button>
              
              <button className='flex-1 bg-red-400 h-10 rounded-2xl cursor-pointer hover:bg-red-700 hover:text-white' type='button' onClick={() => navigate('/Books')}>
                Cancel
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UpdateBook
