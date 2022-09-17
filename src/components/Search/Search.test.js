import { render, screen } from '@testing-library/react'
import Search from './Search'

test('search component empty test', () => {
  expect(true).toBeTruthy()
})

test('renders search component', () => {
  render(<Search />)
  const searchComponent = screen.getByPlaceholderText(/search the moviedb/i)
  expect(searchComponent).toBeInTheDocument()
})