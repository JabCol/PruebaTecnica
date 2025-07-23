import { useState } from 'react'
import { compareAttribute, SortBy } from '../constants'

export function useFilteredSorted(countries = []) {
  const [filterName, setFilterName] = useState()
  const [sorting, setSorting] = useState(SortBy.NONE)

  const filteredCountries = filterName
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterName.toLowerCase()),
      )
    : countries

  const sortedCountries =
    sorting !== SortBy.NONE
      ? filteredCountries.toSorted((a, b) => {
          const fieldFunc = compareAttribute[sorting]
          return fieldFunc(a).localeCompare(fieldFunc(b))
        })
      : filteredCountries

  return {
    setFilterName,
    setSorting,
    sortedCountries,
    filterName,
  }
}
