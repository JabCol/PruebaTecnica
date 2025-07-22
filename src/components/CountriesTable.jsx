import { SortBy } from '../constants'
import { RemoveIcon } from './Icons'

export function CountriesTable({ countries, orderBy, deleteCountry }) {
  return (
    <table className="content-table">
      <thead>
        <tr>
          <th className="pointer_element" onClick={() => orderBy(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer_element" onClick={() => orderBy(SortBy.REGION)}>
            Región
          </th>
          <th>Población</th>
          <th>Bandera</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {countries?.map((country) => (
          <tr key={country.cca2}>
            <td>{country.name.common}</td>
            <td>{country.region}</td>
            <td>{country.population}</td>
            <td>
              <img src={country.flags.png} alt="" />
            </td>
            <td>
              <button onClick={() => deleteCountry(country.cca2)}>
                <RemoveIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
