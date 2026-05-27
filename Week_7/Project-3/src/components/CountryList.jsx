import CountryCard from './CountryCard'

const styles = {
  countryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem'
  }
}

function CountryList({ countries }) {
  return (
    <section style={styles.countryGrid}>
      {countries.map((country) => (
        <CountryCard key={country.cca3 || country.name?.common} country={country} />
      ))}
    </section>
  )
}

export default CountryList
