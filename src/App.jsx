import { useCountries } from './hook/useCountries'
import { CountriesTable } from './components/CountriesTable'
import { usePagination } from './hook/usePagination'
import { useFilteredSorted } from './hook/useFilteredSorted'

export function App() {
  const { countries, loading, error, removeCountries, resetCountries } = useCountries()
  const { filterName, setFilterName, setSorting, sortedCountries } = useFilteredSorted(countries)
  const { currentPage, totalPages, handleNext, handlePrev, dataToShow } = usePagination(
    sortedCountries,
    filterName,
  )

  return (
    <>
      <h1>Tabla de Países</h1>
      <header className="header-table">
        <div className="label-input">
          <label htmlFor="name">Nombre del país</label>
          <input type="text" id="name" onChange={(e) => setFilterName(e.target.value)} />
        </div>
        <button className="button" onClick={resetCountries}>
          Restablecer Paises
        </button>
      </header>
      <main className="main-container">
        {loading && <p>Cargando...</p>}
        {!loading && error && <p>Hubo un error</p>}
        {!loading && !error && countries?.length === 0 && <p>No hay países disponibles</p>}
        {!loading && !error && countries && countries?.length > 0 && (
          <CountriesTable
            countries={dataToShow}
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
