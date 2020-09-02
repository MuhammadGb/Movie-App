import React, {Component} from 'react';

import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Actor from './elements/Actor';
import Navigation from './elements/Navigation';
import Grid from './elements/Grid';
import Spinner from './elements/Spinner';

import {API_KEY, API_URL} from '../config';
import PropTypes from 'prop-types';

class Movie extends Component {

    state = {
        loading: true,
    };

    static propTypes = {
        movieId: PropTypes.string
    }

    fetchMovieData = async () => {
        
        const {movieId} = this.props
        this.setState({error:false, loading: true});
        
        try {
            const endPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
            const result = await(await fetch (endPoint)).json();

            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
            const creditsResult = await(await fetch (creditsEndpoint)).json();

            const directors = creditsResult.crew.filter(
                member => member.job === "Director"
            )

            this.setState({
                ...result,
                actors: creditsResult.cast,
                directors,
                loading:false,
            },
            () => {
                localStorage.setItem(movieId, JSON.stringify(this.state));
            }
            )
        }
        catch(error){
            this.setState({error: true});
        }
    }
    
    componentDidMount() {
        const {movieId} = this.props
        if (localStorage[movieId]){
            this.setState(JSON.parse(localStorage[movieId]))
        }else{
            this.fetchMovieData();
        }
    }
    
    
    render() {
        const {original_title: originalTitle, actors, runtime, revenue, budget, error, loading} = this.state

    if(error) return <div>Something wrong here...</div>
    if(loading) return <Spinner/>

    return(
        <>
        <Navigation movie={originalTitle}/>
        <MovieInfo movie={this.state}/>
        <MovieInfoBar 
            time={runtime}
            budget={budget}
            revenue={revenue}
        />
        <Grid header="Actors">
            {actors.map(actor =>( 
            <Actor key={actor.credit_id} actor={actor}
            />))}
        </Grid>
        </>
        )
    } 
}


export default Movie