import React, { useState } from 'react'
import useSWR from 'swr'

import Pagination from '../Pagination/Pagination'

const Results = ({ searchTerm/* , handleFavorite, favorites */ }) => {
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const [pageNumber, setPageNumber] = useState(1)

  let pages = 0
  const { data, isLoading, error } = useSWR(getUrl(searchTerm, pageNumber), fetcher)

  function handlePageChange(pageNo) {
    if (pageNo < 1 || pageNo > pages) {
      return
    }
    setPageNumber(pageNo)
  }

  function getUrl(searchTerm, pageNumber = 0) {
    return `http://localhost:3001/cache/${searchTerm}/${pageNumber}`;
    // return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${searchTerm}`
  }

  if (isLoading) {
    return (
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>
    )
  }

  if (error) {
    console.error(error)
    return (
      <div className='mx-6 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800' role='alert'>
        <span className='font-medium'>The teapot failed...</span>
      </div>
    )
  } else if (data?.results.length) {
    pages = data.total_pages
    return (
      <>
        <div className='overflow-x-auto relative p-6'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  Poster
                </th>
                <th scope='col' className='py-3 px-6'>
                  Title
                </th>
                <th scope='col' className='py-3 px-6'>
                  Release Date
                </th>
                <th scope='col' className='py-3 px-6'>
                  ID
                </th>
                <th scope='col' className='py-3 px-6'>
                  Vote Average
                </th>
                {/* <th scope='col' className='py-3 px-6'>
                  Favorite
                </th> */}
              </tr>
            </thead>
            <tbody>
              {data.results.map(item => (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={item.id}>
                  <th scope='row' className='py-4 px-6 fron-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    { item.poster_path && <img alt={item.title} src={'https://image.tmdb.org/t/p/original/' + item.poster_path} className='max-h-16' /> }
                  </th>
                  <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {item.title}
                  </th>
                  <td className='py-4 px-6'>
                    {item.release_date ? item.release_date : 'TBD'}
                  </td>
                  <td className='py-4 px-6'>
                    {item.id}
                  </td>
                  <td className='py-4 px-6'>
                    {item.vote_average}
                  </td>
                  {/* <td className='py-4 px-6 hover:cursor-pointer' onClick={ () => handleFavorite(item) }>
                    { favorites.includes(item) ? 'Remove from favorites' : 'Add to favorites' }
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        { pages > 1 && <Pagination pages={data.total_pages} pageNumber={data.page} handlePageChange={handlePageChange} /> }
      </>
    )
  } else if (data && !data.results.length) {
    return (
      <div className='mx-6 p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800' role='alert'>
        <span className='font-medium'>This page is not ready for your search :(</span>
      </div>
    )
  } else {
    return (
      <div className='flex justify-center'>
        <svg aria-hidden='true' className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'/>
          <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill'/>
        </svg>
      </div>
    )
  }
}

export default Results
