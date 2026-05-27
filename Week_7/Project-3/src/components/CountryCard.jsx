const styles = {
  countryCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#ffffff',
    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)'
  },
  countryFlag: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    display: 'block',
    background: '#f8fafc'
  },
  title: {
    margin: '0.7rem 0.9rem 0.4rem',
    fontSize: '1.1rem'
  },
  contentText: {
    margin: '0.3rem 0.9rem 0.7rem',
    color: '#2c3e50'
  }
}

function CountryCard({ country }) {
  const countryName = country?.name?.common ?? 'Unknown'
  const capital = country?.capital?.[0] ?? 'N/A'
  const population = country?.population?.toLocaleString() ?? 'N/A'
  const region = country?.region ?? 'N/A'
  const flagUrl = country?.flags?.svg || country?.flags?.png || ''

  return (
    <article style={styles.countryCard}>
      {flagUrl ? <img src={flagUrl} alt={`${countryName} flag`} style={styles.countryFlag} /> : null}
      <h3 style={styles.title}>{countryName}</h3>
      <p style={styles.contentText}>
        <strong>Capital:</strong> {capital}
      </p>
      <p style={styles.contentText}>
        <strong>Population:</strong> {population}
      </p>
      <p style={styles.contentText}>
        <strong>Region:</strong> {region}
      </p>
    </article>
  )
}

export default CountryCard
