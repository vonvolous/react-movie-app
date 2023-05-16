import React, { useEffect } from 'react'
import { API_KEY, API_URL } from '../../Config'
import { useParams } from 'react-router-dom'

function MovieDetail() {

    let { movieId } = useParams();

    useEffect(() => {

        console.log(movieId)
        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default MovieDetail;
