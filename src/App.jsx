import { useState } from 'react'
import { SortBy, compareAttribute } from './constants'
import { useCountries } from './hook/useCountries'
import { CountriesTable } from './components/CountriesTable'

export function App() {
  const { countries, loading, error, removeCountries, resetCountries } = useCountries()
  const [filterName, setFilterName] = useState()
  const [sorting, setSorting] = useState(SortBy.NONE)

  const [currentPage, setCurrentPage] = useState(1)
  const countriesPerPage = 10
  const totalPages = Math.ceil(countries.length / countriesPerPage)
  const startIndex = (currentPage - 1) * countriesPerPage
  const endIndex = startIndex + countriesPerPage
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

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

  const countriesToShow = sortedCountries.slice(startIndex, endIndex)

  return (
    <>
      <h1>Tabla de Países</h1>
      <header className="header-table">
        <div className="label-input">
          <label htmlFor="name">Nombre del país</label>
          <input type="text" id="name" onChange={(e) => setFilterName(e.target.value)} />
        </div>
        <button className="button" onClick={resetCountries}>
          Restablecer País
        </button>
      </header>
      <main className="main-container">
        {loading && <p>Cargando...</p>}
        {!loading && error && <p>Hubo un error</p>}
        {!loading && !error && countries?.length === 0 && <p>No hay países disponibles</p>}
        {!loading && !error && countries && countries?.length > 0 && (
          <CountriesTable
            countries={countriesToShow}
            orderBy={setSorting}
            deleteCountry={removeCountries}
          />
        )}
        <div className="buttons">
          <button className="button" onClick={handlePrev} disabled={currentPage === 1}>
            Anterior
          </button>
          <button className="button" onClick={handleNext} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </main>
    </>
  )
}
