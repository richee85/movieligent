const Pagination = ({pages, pageNumber, handlePageChange}) => {
  return (
    <nav className='p-6 flex justify-center'>
      <ul className='inline-flex'>
        <li>
          <button className='py-2 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' disabled={pageNumber <= 1} onClick={() => { handlePageChange(pageNumber-1) }}>Previous</button>
        </li>
        <li>
          <button className='py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>{ pageNumber } of { pages }</button>
        </li>
        <li>
          <button className='py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' disabled={pageNumber >= pages} onClick={() => { handlePageChange(pageNumber+1) }}>Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
