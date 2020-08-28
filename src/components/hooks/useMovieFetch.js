import {useState, useEffect, useCallback} from 'react';
import {API_KEY, API_URL} from '../../config';
import PropTypes from 'prop-types';



export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMovieData = useCallback(async () => {
        setError(false);
        setLoading(true);

        
        try {
            const endPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
            const result = await(await fetch (endPoint)).json();

            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
            const creditsResult = await(await fetch (creditsEndpoint)).json();

            const directors = creditsResult.crew.filter(
                member => member.job === "Director"
            )

            setState({
                ...result,
                actors: creditsResult.cast,
                directors,
            })
        }
        catch(error){
            setError(true);
        }
        setLoading(false);
    }, [movieId])

    
    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData])

    return [state, loading, error]
}
 
useMovieFetch.propTypes = {
    movieId: PropTypes.object
}