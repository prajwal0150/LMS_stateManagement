import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BookView = ({id, popup, setpopup}) => {
    const allBooks = useSelector((state) => state.app.books)
    const book = allBooks.find((item) => String(item.id ?? item.Bookid) === String(id))
    const navigate = useNavigate()

    if (!id || !book) return null;

    const handleBorrow = () => {
        setpopup(false)
        navigate('/borrow')
    }

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
                
                <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl transition-all duration-300">
                    
                   
                    <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <h2 className="text-xl font-bold font-serif text-slate-800">Book Information Overview</h2>
                        <div className="ml-auto flex items-center gap-3">
                            <button
                                type="button"
                                className="h-10 rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                                onClick={() => setpopup(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer shadow-sm shadow-blue-100"
                                onClick={handleBorrow}
                            >
                                Borrow Book
                            </button>
                        </div>
                    </div>

                    {/* Main Layout Grid Area */}
                    <div className={`grid gap-6 ${book.image ? 'sm:grid-cols-[160px_1fr]' : 'grid-cols-1'}`}>
                      
                        {book.image ? (
                            <div className="flex justify-center sm:block">
                                <img 
                                    src={book.image} 
                                    alt={`${book.title} Cover`} 
                                    className="w-40 h-56 sm:w-full sm:h-64 object-cover rounded-xl shadow-md border border-slate-200 animate-fadeIn" 
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center w-40 h-56 sm:w-full sm:h-64 bg-slate-100 rounded-xl border border-slate-200">
                                <p className="text-slate-500 text-sm font-medium">No book's image</p>
                            </div>
                        )}

                     
                        <div className="space-y-3 text-sm text-gray-700 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Book Name</p>
                                    <p className="mt-0.5 text-base font-bold text-slate-800">{book.title}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Author</p>
                                    <p className="mt-0.5 text-base font-medium text-slate-800">{book.author}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Book'ID (ID)</p>
                                    <p className="mt-0.5 text-base font-mono font-bold text-blue-600">{book.id}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Stock Available</p>
                                    <p className="mt-0.5 text-base font-medium text-slate-800">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${book.total_copies > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {book.total_copies} Units
                                        </span>
                                    </p>
                                </div>
                            </div>
                            
                          
                           
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookView;
