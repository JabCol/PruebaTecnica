import { useEffect, useState } from 'react'
import { getCountries } from '../services/getCountries'

export function useCountries() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = () => {
    setLoading(true)
    setError(false)
    getCountries()
      .then((data) => {
        setCountries(data)
      })
      .catch(() => {
        setError(true)
        console.error('Error de red o del fetch')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const removeCountries = (cca2) => {
    setCountries((prevCountries) => prevCountries.filter((country) => country.cca2 !== cca2))
  }

  const resetCountries = () => {
    fetchCountries()
  }

  return {
    countries,
    loading,
    error,
    removeCountries,
    resetCountries,
  }
}
