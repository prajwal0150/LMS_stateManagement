import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { showBooks, updateBook } from '../features/Books'
import Navbar from './Navbar'

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.app);
  const [updateData, setUpdate] = useState(null);
  const [error, setError] = useState('');

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!Array.isArray(books) || books.length === 0) {
      dispatch(showBooks());
    }
  }, [dispatch, books]);

  useEffect(() => {
    if (id) {
      const singleBook = books.find((ele) => String(ele.id ?? ele.Bookid) === String(id));
      if (singleBook) {
        setUpdate({ ...singleBook });
        setPreview(singleBook.image || null); 
      } else {
        setUpdate(null);
        setPreview(null);
      }
    }
  }, [id, books]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) {
    return (<div className=''>
                <Navbar />

                <div className='bg-white min-h-screen p-6 flex flex-col items-center justify-center gap-4'>
                    <div className='w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin' />
                    <p className='text-gray-500 font-serif text-sm'>Loading books...</p>
                </div>
            </div>)
  }

  const newData = (event) => {
    const { name, value } = event.target;
    setUpdate({
      ...updateData,
      [name]: name === 'total_copies' ? Number(value) : value
    });
  };
  const handlefileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile=e.target.files[0];

      const imageTypes=['image/png', 'image/jpeg', 'image/jpg'];
      if (!imageTypes.includes(selectedFile.type)) {
        setError("Invalid format. Only PNG, JPG, and JPEG images are permitted.");
        setFile(null);
        if (fileInput.current) fileInput.current.value = null;
        return;
      }
      setError('');
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
     if (!updateData?.title || !updateData?.author || !updateData?.isbn || updateData?.total_copies === undefined) {
      setError("All text fields are required.");
      return;
    }

    const payload = file
      ? (() => {
          const formDataPayload = new FormData();
          formDataPayload.append('title', updateData.title);
          formDataPayload.append('author', updateData.author);
          formDataPayload.append('isbn', updateData.isbn);
          formDataPayload.append('total_copies', Number(updateData.total_copies));
          formDataPayload.append('image', file);
          return formDataPayload;
        })()
      : {
          id: Number(id),
          title: updateData.title,
          author: updateData.author,
          isbn: updateData.isbn,
          total_copies: Number(updateData.total_copies),
        };

    try {
      await dispatch(updateBook(file ? { id: Number(id), formDataPayload: payload } : payload)).unwrap();
      alert("Book updated successfully.");
      navigate("/Books");
    } catch (submitError) {
      setError(submitError || 'Failed to update book');
    }
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
        {/* <Navbar/> */}
      <div className="fixed inset-0 z-5 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
      <div className='w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl transition-all duration-300'>

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
              name='title'
              value={updateData&& updateData?.title || ''}
              onChange={newData}
              />
              
            </label>
            <label className=''>
              Author
              <input type='text'
              placeholder='e.g: Brendan Eich'
              className='w-full bg-blue-50 p-2 rounded-lg'
              name='author'
              value={updateData&& updateData?.author || ''}
              onChange={newData}
              />
              
            </label>
            <label className=''>
              Quantity
              <input type='number'
              placeholder='e.g: 15'
              className='w-full bg-blue-50 p-2 rounded-lg'
              name='total_copies'
              value={updateData&& updateData?.total_copies || ''}
              onChange={newData}
              />
              
            </label>
            <label className=''>
              ISBN
              <input type='text'
              placeholder='e.g: 15'
              className='w-full bg-blue-50 p-2 rounded-lg'
              name='isbn'
              value={updateData&& updateData?.isbn || ''}
              onChange={newData}
              />
              </label>
            <div className='flex flex-col gap-2 border border-dashed border-slate-200 p-3 rounded-xl bg-slate-50/50'>
                <label className='text-xs font-semibold text-slate-600 uppercase tracking-wide'>Modify Cover Image (Optional PNG/JPG)</label>
                <input 
                  type='file' 
                  accept='.png, .jpg, .jpeg' 
                  ref={fileInput}
                  onChange={handlefileChange} 
                  className='text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 cursor-pointer' 
                />
                
                {preview && (
                  <div className="mt-1 flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-100">
                    <img src={preview} alt="Cover Preview Thumbnail" className="w-12 h-16 object-cover rounded-md border shadow-sm" />
                    <div className="text-xs text-slate-500">
                      <p className="font-semibold text-slate-700">Active Form Cover Image</p>
                      <p>{file ? `New Upload: ${(file.size / 1024).toFixed(1)} KB` : "Current database file template"}</p>
                    </div>
                  </div>
                )}
              </div>

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
