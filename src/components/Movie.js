import React from 'react';

import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Actor from './elements/Actor';
import Navigation from './elements/Navigation';
import Grid from './elements/Grid';
import Spinner from './elements/Spinner';

import {useMovieFetch} from './hooks/useMovieFetch';
import PropTypes from 'prop-types';




const Movie = ({movieId}) => {

    const [state, loading, error] = useMovieFetch(movieId)
    //console.log(state)

    if(error) return <div>Something wrong here...</div>
    if(loading) return <Spinner/>

    return(
        <>
        <Navigation movie={state.original_title}/>
        <MovieInfo movie={state}/>
        <MovieInfoBar 
            time={state.runtime}
            budget={state.budget}
            revenue={state.revenue}
        />
        <Grid header="Actors">
            {state.actors.map(actor =>( 
            <Actor key={actor.credit_id} actor={actor}
            />))}
        </Grid>
        </>
    );
} 
Movie.propTypes = {
    movieId: PropTypes.string
}

export default Movie