import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import { useParams } from 'react-router-dom'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function MovieDetail() {

    let { movieId } = useParams();
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

      let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      
      let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
      
      fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
          console.log(response)
          setMovie(response)
      })

      fetch(endpointCrew)
      .then(response => response.json())
      .then(response => {
          console.log('responseForCrew', response)
          setCasts(response.cast)
      })
    }, [])

    const toggleActorView = () => {
      setActorToggle(!ActorToggle)
    }

  return (
    <div>
      {/* Header */}

      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}

      <div style={{width: '85%', margin: '1rem auto'}}>

        {/* Movie Info */}
        <MovieInfo 
          movie={Movie}
        />

        <br />

        {/* Actors Grid */}

        <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
          <button onClick={toggleActorView}> Toggle Actor View </button>
        </div>

        {ActorToggle && 
          <Row gutter={[16, 16]}> 
          {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w300${cast.profile_path}` : null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
          ))}
          </Row>
        }

      </div>


    </div>
  )
}

export default MovieDetail;
