import { useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import Results from './components/Results/Results'
import Favorites from './components/Favorites/Favorites'

import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  function handleSearch (search = searchTerm) {
    setSearchTerm(search)
  }

  function handleFavorite (item) {
    const index = favorites.indexOf(item)
    if (index > -1) {
      const fav = favorites
      fav.splice(index, 1)
      setFavorites([...fav])
    } else {
      setFavorites([...favorites, item])
    }
  }

  return (
    <div className='bg-gray-400 w-[100%) h-[100%] min-h-[100vh]'>
      <h1 className='text-center text-4xl font-bold pt-12 pb-8'>Movieligent</h1>
      <Search handleSearch={handleSearch} />
      { searchTerm && <Results searchTerm={searchTerm} handleFavorite={handleFavorite} favorites={favorites} /> }
      <Favorites handleFavorite={handleFavorite} favorites={favorites} />
    </div>
  )
}

export default App 
