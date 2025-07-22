export function getCountries() {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,cca2,flags,capital,region,population',
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error HTTP')
      }
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.error('Error de red o del fetch')
      throw err
    })
}
