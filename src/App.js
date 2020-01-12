import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=')
  const [loading, setLoading] = useState(false)

  const fetchNews = () => {
    setLoading(true)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setNews(data.hits) 
        setLoading(false)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line
  }, [url])

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const ShowLoading = () => {
    if (loading) {
      return <p>Loading...</p>
    } else {
      return news.map((n, i) => <p key={i}><a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a></p>)
    }
  }

  return (
    <div className="main-content">
      <h2>News</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      <ShowLoading />
    </div>
  )
}

export default App;
