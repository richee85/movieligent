import { render, screen } from '@testing-library/react'
import App from './App'

test('renders search component', () => {
  render(<App />)
  const searchComponent = screen.getByPlaceholderText(/search the moviedb/i)
  expect(searchComponent).toBeInTheDocument()
})

test('renders page title', () => {
  render(<App />)
  const titleElement = screen.getByText(/movie-ligent/i)
  expect(titleElement).toBeInTheDocument()
})
