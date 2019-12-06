import {observable, action, configure, runInAction} from 'mobx';

import {API_BASE, API_KEY} from '../constants';
import axios from 'axios';

configure({
   enforceActions: 'observed'
});

import AuthStore from './AuthStore';

class MovieStore{
    @observable popularMovies = [];
    @observable topRatedMovies = [];
    @observable movieDetail = {};
    @observable movieCast = [];
    @observable movieCrew = [];
    @observable movieReviews = [];
    @observable movieSimilar = [];
    @observable loading = false;

    @action async getPopularMovies(page){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
            runInAction(() => {
                this.popularMovies = [...this.popularMovies, ...data.results];
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async getTopRatedMovies(page){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
            runInAction(() => {
                this.topRatedMovies = [...this.topRatedMovies, ...data.results];
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async getMovie(movieId){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            runInAction(() => {
                this.movieDetail = data;
            });
            const credits = await axios.get(`${API_BASE}/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
            runInAction(() => {
                this.movieCast = credits.data.cast;
                this.movieCrew = credits.data.crew;
            });
            const reviews = await axios.get(`${API_BASE}/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`);
            runInAction(() => {
                this.movieReviews = reviews.data.results;
            });
            const similar = await axios.get(`${API_BASE}/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`);
            runInAction(() => {
                console.log(similar.data.results);
                this.movieSimilar = similar.data.results;
                this.loading = false;
            });
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }
}

export default new MovieStore()
