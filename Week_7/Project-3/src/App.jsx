import { useEffect, useRef, useState } from 'react'
import './App.css'
import CountryList from './components/CountryList'
import SearchBar from './components/SearchBar'

const ALL_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,currencies,cca3'
const SEARCH_COUNTRY_URL =
  'https://restcountries.com/v3.1/name/'

const styles = {
  appShell: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1rem 3rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#172b4d'
  },
  appHeader: {
    marginBottom: '1.5rem'
  },
  heading: {
    margin: 0,
    fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)'
  },
  subHeading: {
    margin: '0.6rem 0 0',
    color: '#34495e'
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '1.25rem'
  },
  statusBase: {
    margin: '0.9rem 0',
    padding: '0.75rem 0.9rem',
    borderRadius: '10px'
  },
  statusLoading: {
    background: '#fef7e0',
    color: '#8a6d3b'
  },
  statusError: {
    background: '#fdecea',
    color: '#b71c1c'
  },
  statusSuccess: {
    background: '#e8f5e9',
    color: '#1b5e20'
  },
  statusEmpty: {
    background: '#eef2f7',
    color: '#2c3e50'
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const debounceRef = useRef(null)
  const abortRef = useRef(null)

  const fetchCountries = async (searchTerm = '') => {
    if (abortRef.current) {
      abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller

    const requestUrl = searchTerm
      ? `${SEARCH_COUNTRY_URL}${encodeURIComponent(searchTerm)}?fields=name,capital,flags,population,region,currencies,cca3`
      : ALL_COUNTRIES_URL

    setLoading(true)
    setError('')

    try {
      const response = await fetch(requestUrl, { signal: controller.signal })

      if (!response.ok) {
        if (response.status === 404) {
          setCountries([])
          setLoading(false)
          return
        }
        throw new Error('Unable to fetch countries. Please try again.')
      }

      const data = await response.json()
      setCountries(Array.isArray(data) ? data : [])
    } catch (fetchError) {
      if (fetchError.name !== 'AbortError') {
        setCountries([])
        setError(fetchError.message || 'Something went wrong while fetching data.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      fetchCountries()
      return undefined
    }

    debounceRef.current = setTimeout(() => {
      fetchCountries(trimmedQuery)
    }, 500)

    return () => {
      clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current)
      if (abortRef.current) {
        abortRef.current.abort()
      }
    }
  }, [])

  return (
    <main style={styles.appShell}>
      <header style={styles.appHeader}>
        <h1 style={styles.heading}>Country Explorer</h1>
      </header>

      <section style={styles.toolbar}>
        <SearchBar onSearch={setQuery} query={query} />
      </section>

      {loading ? <p style={{ ...styles.statusBase, ...styles.statusLoading }}>Loading countries...</p> : null}
      {!loading && error ? <p style={{ ...styles.statusBase, ...styles.statusError }}>{error}</p> : null}
      {!loading && !error && countries.length === 0 ? (
        <p style={{ ...styles.statusBase, ...styles.statusEmpty }}>No countries found for "{query.trim()}".</p>
      ) : null}

      {!loading && !error && countries.length > 0 ? (
        <>
          <p style={{ ...styles.statusBase, ...styles.statusSuccess }}>Showing {countries.length} countries</p>
          <CountryList countries={countries} />
        </>
      ) : null}
    </main>
  )
}

export default App
