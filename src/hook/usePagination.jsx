import { useState, useEffect } from 'react'

export function usePagination(data = [], filterName = '') {
  const [currentPage, setCurrentPage] = useState(1)
  const dataPerPage = 10

  useEffect(() => {
    setCurrentPage(1)
  }, [filterName])

  const totalPages = Math.ceil(data.length / dataPerPage)
  const startIndex = (currentPage - 1) * dataPerPage
  const endIndex = Math.min(startIndex + dataPerPage, data.length)
  const dataToShow = data.slice(startIndex, endIndex)

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prevCurrentPage) => prevCurrentPage - 1)
  }

  return {
    currentPage,
    setCurrentPage,
    dataPerPage,
    totalPages,
    startIndex,
    endIndex,
    handleNext,
    handlePrev,
    dataToShow,
  }
}
