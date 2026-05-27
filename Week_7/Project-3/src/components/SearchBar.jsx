import { useEffect, useRef } from 'react'

const styles = {
  wrapper: {
    flex: 1,
    minWidth: '260px'
  },
  input: {
    width: '100%',
    border: '1px solid #cfd8dc',
    borderRadius: '10px',
    padding: '0.7rem 0.9rem',
    fontSize: '1rem'
  }
}

function SearchBar({ onSearch, query }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div style={styles.wrapper}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search countries by name..."
        value={query}
        onChange={(event) => onSearch(event.target.value)}
        aria-label="Search countries by name"
        style={styles.input}
      />
    </div>
  )
}

export default SearchBar
