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
            <div className="fixed inset-0 z-5 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
                <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl transition-all duration-300">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-gray-800">Book Details</h2>
                        <div className="ml-auto flex items-center gap-3">
                            <button
                                type="button"
                                className="h-10 rounded-2xl bg-red-400 px-4 p-2 text-white hover:bg-red-650 transition cursor-pointer"
                                onClick={() => setpopup(false)}
                            >
                                cancel
                            </button>
                            <button
                                type="button"
                                className="h-10 rounded-2xl bg-sky-500 px-4 p-2 text-white hover:bg-sky-600 transition cursor-pointer"
                                onClick={handleBorrow}
                            >
                                Borrow Book
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs uppercase tracking-wide text-gray-500">Book Name</p>
                            <p className="mt-1 text-base font-medium text-gray-900">{book.title}</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs uppercase tracking-wide text-gray-500">Author</p>
                            <p className="mt-1 text-base font-medium text-gray-900">{book.author}</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs uppercase tracking-wide text-gray-500">Quantity</p>
                            <p className="mt-1 text-base font-medium text-gray-900">{book.total_copies}</p>
                        </div>
                        <p className="rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
                            Use the Borrow page to enter the book id and create the borrow log.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookView;
