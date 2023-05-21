import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
import { Button } from 'antd'
import {FcIdea} from "react-icons/fc";

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null) 
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    
    fetchMovies(endpoint)
  }, [])

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log(response.results)
      setMovies([...Movies, ...response.results])
      setMainMovieImage(response.results[0])
      setCurrentPage(response.page)
    })
  }

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    
    fetchMovies(endpoint)
  }

  return (
    <>
      <div style={{ width:'100%', margin: '0' }}>

        {/* Main Image */}
        {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
        }

        <div style={{ width: '85%', margin: '1rem auto' }}> 
          <h2><FcIdea style={{fontSize: '2rem'}} /> Movies by latest</h2>
          <hr />

          {/* Movie Grid Cards */}
          <Row gutter={[16, 16]}> 
          {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w300${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
          ))}
          </Row>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '13px' }}>
          <Button onClick={loadMoreItems}>Load More</Button>
        </div>

      </div>
    </>
  )
}

export default LandingPage
