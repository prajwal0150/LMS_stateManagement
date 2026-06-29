import React from 'react'
import { useSelector } from 'react-redux'

const BookView = ({id, popup, setpopup}) => {
    const allBooks=useSelector((state)=>state.app.books);
    const singleBook=allBooks.filter((ele)=>ele.Bookid===id);

  return (
    <div>
      <div className="fixed inset-0 z-5 flex items-center justify-center bg-black/40 p-4">
			<div className=" w-full max-w-lg  rounded-2xl bg-white p-5 shadow-xl">
				<div className="mb-4 flex items-center justify-between gap-3">
                    {/* head */}
					<h2 className="text-lg font-semibold text-gray-800">Book Details</h2>
					<div className="ml-auto flex mt-8 items-center gap-3">
						<button
							type="button"
							className="h-10 rounded-2xl bg-red-400 px-4 p-2 hover:bg-red-600"
							onClick={()=>setpopup(false)}
						>
							cancel
						</button>
						<button
							type="button"
							className="h-10 rounded-2xl bg-sky-300 px-4 p-2 hover:bg-sky-600"
							// onClick={() => setShowAddForm((current) => !current)}
						>
							+ Add Book
						</button>
					</div>
				</div>
{/* 
                {showAddForm ? (
				<form className="mb-5 space-y-3 rounded-xl border border-sky-100 bg-sky-50 p-4" onSubmit={handleAddSubmit}>
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

					{/* {error ? <p className="text-sm text-red-500">{error}</p> : null} */}

					{/* <div className="flex justify-end gap-3">
						
						<button
							type="submit"
							
							className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
						>
							Done
						</button>
					</div>
				</form>
			) : null} */} 

                    {/* Books Details page */}
				<div className="space-y-3 text-sm text-gray-700">
					<div className="rounded-xl bg-gray-50 p-3">
						<p className="text-xs uppercase tracking-wide text-gray-500">Book Name</p>
						<p className="mt-1 text-base font-medium text-gray-900">{singleBook[0].BookName}</p>
					</div>

					<div className="rounded-xl bg-gray-50 p-3">
						<p className="text-xs uppercase tracking-wide text-gray-500">Author</p>
						<p className="mt-1 text-base font-medium text-gray-900">{singleBook[0].Author}</p>
					</div>

					<div className="rounded-xl bg-gray-50 p-3">
						<p className="text-xs uppercase tracking-wide text-gray-500">Quantity</p>
						<p className="mt-1 text-base font-medium text-gray-900">{singleBook[0].Quantity}</p>
					</div>
				</div>

                {/* Logs */}
				{/* <div className="mt-5">
					<h2 className="text-lg font-semibold text-gray-800">Logs</h2>
					<div className="mt-3 space-y-2">
						{logs
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
											disabled={returningLogId === log.id}
											className="ml-auto rounded-2xl bg-red-500 px-4 py-2 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
											onClick={() => handleReturn(log)}
										>
											{log.returnedAt ? 'Returned' : 'Return'}
										</button>
									</div>
								</div>
							))}
					</div>
				</div>*/}
                
			</div>
		</div> 
    </div>
  )
}

export default BookView
