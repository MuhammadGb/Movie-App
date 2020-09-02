import {useState, useEffect} from 'react';
import {POPULAR_BASE_URL} from '../../config';


export const useHomeFetch = searchTerm => {
    const [state, setState] = useState({ movies:[] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovie = async endPoint => {
        setError(false);
        setLoading(true);

        const isLoadMore = endPoint.search("page");

        try {
            const result = await(await fetch (endPoint)).json();
            console.log(result);
            setState(prevState => ({
                ...prevState,
                movies: 
                isLoadMore !== -1
                ? [...prevState.movies, ...result.results]
                :[...result.results],
                heroImage: prevState.heroImage||result.results[0],
                currentPage: result.page,
                totalPage: result.total_pages,
            }))
        }
        catch(error){
            setError(true)
            console.log("error")
        }
        setLoading(false);
    }
    useEffect(() => {
        if(sessionStorage.homeState){
            setState(JSON.parse(sessionStorage.homeState));
            setLoading(false)
        }else{
            fetchMovie(POPULAR_BASE_URL)
        }
    },[])

    useEffect(() => {
        if(!searchTerm) {
            sessionStorage.setItem("homeState", JSON.stringify(state));
        }
    },[searchTerm, state])

    return [fetchMovie, {state, loading, error}]
}