import React, { useState, useEffect } from 'react';
import LoadMoreButton from './elements/LoadMoreButton';
import HeroImage from './elements/HeroImage';
import MovieThumb from './elements/MovieThumb';
import SearchBar from './elements/SearchBar';
import Spinner from './elements/Spinner';
import Grid from './elements/Grid';

import {SEARCH_BASE_URL, POPULAR_BASE_URL, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE} from '../config';
import {useHomeFetch} from './hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';

const Home = () => { 
    const [searchTerm, setSearchTerm] = useState("");
    const [fetchMovie, {state, loading, error}] = useHomeFetch(searchTerm);

    const searchMovies = search => {
        const endpoint = search? SEARCH_BASE_URL + search :POPULAR_BASE_URL
        setSearchTerm(search);

        fetchMovie(endpoint)
        
    }

    const loadMoreMovies = () => {
        const searchEndPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${state.currentPage + 1}`;
        const popularEndPoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`;

        const endpoint = searchTerm? searchEndPoint: popularEndPoint;
        fetchMovie(endpoint);
    }

    //error?<div>Something went wrong...</div>:""
    //state.movies[0]?<Spinner/>:""
    if(error)return <div>Something went wrong...</div>
    if(!state.movies[0])return<Spinner/>

    return(
        <React.Fragment>
            {(!searchTerm &&
                <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                title={state.heroImage.orignal_title}
                text={state.heroImage.overview}/>
            )}
            <SearchBar callback={searchMovies}/>
            <Grid header = {searchTerm? "Search Result": "Popular Movies"}>
                {state.movies.map(movie => (
                    <MovieThumb key = {movie.id}
                    clickable 
                    image = {
                        movie.poster_path
                        ?`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : NoImage
                    }
                    movieId = {movie.id}
                    movieName = {movie.orignal_title}/>
                ))}
            </Grid>
            {loading && <Spinner/>}
            {state.currentPage < state.totalPage && !loading && ( 
            <LoadMoreButton text="Load More" callback={loadMoreMovies}/>
            )}
        </React.Fragment>
    )
};

export default Home;