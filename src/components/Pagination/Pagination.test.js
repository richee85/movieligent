import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'

test('renders next button', () => {
  render(<Pagination />)
  const nextButton = screen.getByText(/next/i)
  expect(nextButton).toBeInTheDocument()
})

test('renders prev button', () => {
  render(<Pagination />)
  const previousButton = screen.getByText(/previous/i)
  expect(previousButton).toBeInTheDocument()
})
