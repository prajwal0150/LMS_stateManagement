import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { showBooks, updateBook } from '../features/Books'
import { addLog, fetchLogs, returnBookLog } from '../features/Logs'

const Borrow = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { books, loading: booksLoading, error: booksError } = useSelector((state) => state.app)
  const { loogs, loading: logsLoading, error: logsError } = useSelector((state) => state.logs)

  const [bookId, setBookId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    dispatch(showBooks())
    dispatch(fetchLogs())
  }, [dispatch])

  const allBorrowLogs = useMemo(() => loogs || [], [loogs])

  const hasActiveBorrow = (bookIdValue) => {
    return allBorrowLogs.some((log) => {
      const logBookId = String(log?.book_id ?? log?.bookid ?? log?.Bookid)
      const isReturned = Boolean(log?.is_returned ?? log?.returned_at ?? log?.returnedAt)
      return logBookId === String(bookIdValue) && !isReturned
    })
  }

  const resolveBook = (log) => {
    const logBookId = log?.book_id ?? log?.bookid ?? log?.Bookid
    return books.find((book) => String(book.id ?? book.Bookid) === String(logBookId)) ?? null
  }

  const formatDateTime = (value) => {
    if (!value) {
      return 'N/A'
    }

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleString()
  }

  const getErrorMessage = (err, fallback) => {
    if (typeof err === 'string' && err.trim()) {
      return err
    }

    if (err?.message) {
      return err.message
    }

    return fallback
  }

  const handleBorrowSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    const normalizedBookId = String(bookId).trim()

    if (!normalizedBookId) {
      setError('Book id is required.')
      return
    }

    const book = books.find((item) => String(item.id ?? item.Bookid) === normalizedBookId)

    if (!book) {
      setError('No book found for this id.')
      return
    }

    if (hasActiveBorrow(normalizedBookId)) {
      setError('You already borrowed this book.')
      return
    }

    const currentQuantity = Number(book.total_copies) || 0

    if (currentQuantity <= 0) {
      setError('This book is currently unavailable.')
      return
    }

    const updatedBook = {
      ...book,
      total_copies: currentQuantity - 1,
    }

    const logForm = {
      book_id: book.id,
    }

    try {
      await dispatch(updateBook(updatedBook)).unwrap()
      await dispatch(addLog({ book_id: book.id, logForm })).unwrap()
      await dispatch(fetchLogs(book.id)).unwrap()

      setBookId('')
      alert('Borrow book successfully.')
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to save borrow log.'))
    }
  }

  const handleReturn = async (log) => {
    const logBookId = log?.book_id ?? log?.bookid ?? log?.Bookid
    const relatedBook = books.find((book) => String(book.id ?? book.Bookid) === String(logBookId)) ?? null
    const updatedLog = {
      ...log,
      returned_at: new Date().toISOString(),
      is_returned: true,
    }

    try {
      if (relatedBook) {
        await dispatch(updateBook({
          ...relatedBook,
          total_copies: (Number(relatedBook.total_copies) || 0) + 1,
        })).unwrap()
      }

      await dispatch(returnBookLog({ Bookid: logBookId, logId: log.id, updatedLog })).unwrap()
      await dispatch(fetchLogs()).unwrap()
      alert('Book returned successfully.')
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to return book.'))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Borrow Books</h1>
            <p className="mt-1 text-sm text-slate-500">Enter a book id, create a borrow log, and manage returns from the same page.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/Books')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Back to Books
          </button>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleBorrowSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label htmlFor="book-id" className="mb-2 block text-sm font-medium text-slate-700">
                Book Id
              </label>
              <input
                id="book-id"
                type="text"
                value={bookId}
                onChange={(event) => setBookId(event.target.value)}
                placeholder="Enter book id"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              Done
            </button>
          </form>

          {error ? <p className="mt-4 text-sm font-medium text-red-500">{error}</p> : null}
          {message ? <p className="mt-4 text-sm font-medium text-green-600">{message}</p> : null}
          {booksError ? <p className="mt-4 text-sm font-medium text-red-500">{booksError}</p> : null}
          {/* {booksLoading ? <p className="mt-4 text-sm text-slate-500">Loading books...</p> : null} */}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Borrow Logs</h2>
              <p className="mt-1 text-sm text-slate-500">All borrowed books are listed here after redirecting to this page.</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {logsLoading ? <p className="text-sm text-slate-500">Loading logs...</p> : null}

            {!logsLoading && allBorrowLogs.length === 0 ? (
              <p className="text-sm italic text-slate-500">No borrowed books found.</p>
            ) : null}

            {allBorrowLogs.map((log) => {
              const book = resolveBook(log)
              const logBookId = log.book_id ?? log.bookid ?? log.Bookid
              const borrowedAt = log.borrowed_at ?? log.createdAt
              const returnedAt = log.returned_at ?? log.returnedAt
              const isReturned = Boolean(log.is_returned ?? returnedAt)

              return (
              <div key={log.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-900">Book Id:</span> {log.book_id ?? log.bookid ?? log.Bookid}
                    </p>
                    {book ? (
                      <p>
                        <span className="font-medium text-slate-900">Book Name:</span> {book.title}
                      </p>
                    ) : null}
                    <p>
                      <span className="font-medium text-slate-900">Borrowed At:</span> {formatDateTime(borrowedAt)}
                    </p>
                    {returnedAt ? (
                      <p>
                        <span className="font-medium text-slate-900">Return Date:</span> {formatDateTime(returnedAt)}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    disabled={isReturned}
                    onClick={() => handleReturn(log)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      isReturned ? 'bg-slate-400' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {isReturned ? 'Returned' : 'Return'}
                  </button>
                </div>
              </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Borrow
