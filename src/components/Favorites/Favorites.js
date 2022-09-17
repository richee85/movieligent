import React from 'react'

const Favorites = ({favorites, handleFavorite}) => {
  return (
    <div className='overflow-x-auto relative px-6'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
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
            <th scope='col' className='py-3 px-6'>
              Favorite
            </th>
          </tr>
        </thead>
        <tbody>
        { favorites.length ? favorites.map(item => (
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={item.id}>
              <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                {item.title}
              </th>
              <td className='py-4 px-6'>
                {item.release_date}
              </td>
              <td className='py-4 px-6'>
                {item.id}
              </td>
              <td className='py-4 px-6'>
                {item.vote_average}
              </td>
              <td className='py-4 px-6' onClick={() => handleFavorite(item)}>
                {favorites.includes(item) ? 'Remove from favorites' : 'Add to favorites'}
              </td>
            </tr>
          )) : <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center'>
                <th colSpan='5' scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  No favorites...
                </th>
              </tr> }
        </tbody>
      </table>
    </div>
  )
}
export default Favorites
