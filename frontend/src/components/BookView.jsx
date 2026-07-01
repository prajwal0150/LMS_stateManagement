import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBook } from '../features/Books'
import { fetchLogs, addLog, returnBookLog } from '../features/Logs'

const BookView = ({id, popup, setpopup}) => {
    const dispatch = useDispatch()
    const allBooks = useSelector((state) => state.app.books)
    const singleBook = allBooks.filter((ele) => String(ele.id ?? ele.Bookid) === String(id))
    const book = singleBook[0]

    const { loogs, loading: logsLoading, error: logsError } = useSelector((state) => state.logs)

    const [showAddForm, setShowAddForm] = useState(false)
    const [adderName, setAdderName] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (id) {
            dispatch(fetchLogs(id))
        }
    }, [id, dispatch])

    if (!book) return null;

    const handleAddSubmit = async (e) => {
        e.preventDefault()

        if (!adderName.trim()) {
            setError("Adder name is required!")
            return
        }

        const currentQuantity = Number(book.total_copies) || 0
        const nextQuantity = Math.max(0, currentQuantity - 1)

        try {
            const updatedBook = {
                ...book,
                total_copies: nextQuantity,
            }

            // Update book quantity first
            await dispatch(updateBook(updatedBook)).unwrap()

            const logForm = {
                BookId: book.Bookid,
                AddName: adderName.trim(),
                createdAt: new Date().toISOString(),
                returnedAt: null,
            }

            // Post log
            await dispatch(addLog({ Bookid: book.Bookid, logForm })).unwrap()

            alert("Book added successfully!")
            setShowAddForm(false)
            setAdderName("")
            setError(null)
        } catch (err) {
            console.log('Failed to save.', err)
            setError('Failed to save')
        }
    }

    const handleReturn = async (log) => {
        const nextQuantity = Number(book.total_copies) + 1

        try {
            const updatedBook = {
                ...book,
                total_copies: nextQuantity,
            }

            // Update book quantity first
            await dispatch(updateBook(updatedBook)).unwrap()

            const updatedLog = {
                ...log,
                returnedAt: new Date().toISOString(),
            }

            // Put log update
            await dispatch(returnBookLog({ Bookid: book.Bookid, logId: log.id, updatedLog })).unwrap()

            alert("Book returned successfully!")
        } catch (err) {
            console.log('Failed to return book.', err)
            setError('Failed to return book.')
        }
    }

    return (
        <div>
            <div className="fixed inset-0 z-5 flex items-center justify-center bg-black/40 p-4 animate-fadeIn">
                <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl transition-all duration-300">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        {/* head */}
                        <h2 className="text-lg font-semibold text-gray-800">Book Details</h2>
                        <div className="ml-auto flex mt-8 items-center gap-3">
                            <button
                                type="button"
                                className="h-10 rounded-2xl bg-red-400 px-4 p-2 text-white hover:bg-red-650 transition cursor-pointer"
                                onClick={() => setpopup(false)}
                            >
                                cancel
                            </button>
                            <button
                                type="button"
                                className="h-10 rounded-2xl bg-sky-300 px-4 p-2 text-white hover:bg-sky-600 transition cursor-pointer"
                                onClick={() => setShowAddForm((current) => !current)}
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>

                    {showAddForm ? (
                        <form className="mb-5 space-y-3 rounded-xl border border-sky-100 bg-sky-50 p-4 transition-all duration-300" onSubmit={handleAddSubmit}>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Adder Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none focus:border-sky-400"
                                    placeholder="Enter adder name"
                                    value={adderName}
                                    onChange={(e) => setAdderName(e.target.value)}
                                />
                            </div>

                            {error ? <p className="text-sm text-red-500">{error}</p> : null}

                            <div className="flex justify-end gap-3">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                >
                                    Done
                                </button>
                            </div>
                        </form>
                    ) : null}

                    {/* Books Details page */}
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
                    </div>

                    {/* Logs */}
                    <div className="mt-5">
                        <h2 className="text-lg font-semibold text-gray-800">Logs</h2>
                        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
							
                            {logsLoading && <p className="text-sm text-gray-500">Loading logs...</p>}
                            {logsError && <p className="text-sm text-red-500">{logsError}</p>}
                            {!logsLoading && (!loogs || loogs.filter((log) => log?.AddName && log?.createdAt).length === 0) && (
                                <p className="text-sm text-gray-500 italic">No logs available for this book.</p>
                            )}
                            {loogs && loogs
                                .filter((log) => log?.AddName && log?.createdAt)
                                .map((log) => (
                                    <div key={log.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p><span className="font-medium text-gray-900">Add Name:</span> {log.AddName}</p>
                                                <p><span className="font-medium text-gray-900">Created Date:</span> {new Date(log.createdAt).toLocaleString()}</p>
                                                {log.returnedAt ? (
                                                    <p><span className="font-medium text-gray-900">Return Date:</span> {new Date(log.returnedAt).toLocaleString()}</p>
                                                ) : null}
                                            </div>
                                            <button
                                                type="button"
                                                disabled={!!log.returnedAt}
                                                className={`ml-auto rounded-2xl px-4 py-2 text-white text-xs font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 transition ${
                                                    log.returnedAt ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
                                                }`}
                                                onClick={() => handleReturn(log)}
                                            >
                                                {log.returnedAt ? 'Returned' : 'Return'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookView;
