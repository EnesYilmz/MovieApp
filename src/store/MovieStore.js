import {observable, action, configure, runInAction} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import {API_BASE, API_KEY} from '../constants';
import axios from 'axios';

configure({
   enforceActions: 'observed'
});

import AuthStore from './AuthStore';

class MovieStore{
    @observable popularMovies = [];
    @observable topRatedMovies = [];
    @observable moviesWithGenre = [];
    @observable searchedMovies = [];
    @observable watchlistMovies = [];
    @observable movieDetail = {};
    @observable movieCast = [];
    @observable movieCrew = [];
    @observable movieReviews = [];
    @observable movieSimilar = [];
    @observable genres = [];
    @observable selectedGenre = '';
    @observable loading = false;

    @action async getPopularMovies(page){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
            runInAction(() => {
                this.popularMovies = data.results;
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async getMorePopularMovies(page){
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

    @action async getMoviesWithGenre(page){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${this.selectedGenre.id}`);
            runInAction(() => {
                this.moviesWithGenre = [...this.moviesWithGenre, ...data.results];
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async searchMovies(text){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/search/movie?api_key=${API_KEY}&language=en-US&query=${text}`);
            runInAction(() => {
                this.searchedMovies = data.results;
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async getWatchlistMovies(){
        let sessionId = await AsyncStorage.getItem('token');
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/account/{account_id}/watchlist/movies?api_key=${API_KEY}&language=en-US&session_id=${sessionId}`);
            runInAction(() => {
                this.watchlistMovies = [...this.watchlistMovies, ...data.results];
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async addMovieWatchlist(movieId){
        let sessionId = await AsyncStorage.getItem('token');
        this.loading = true;
        try{
            await axios.post(`${API_BASE}/3/account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`, {
                media_type: "movie",
                media_id: movieId,
                watchlist: true
            });
            runInAction(() => {
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    @action async setSearchedMovies(array){
        this.searchedMovies = array;
    }

    @action async getGenres(){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            runInAction(() => {
                this.genres = data.genres;
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
