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
    @observable movie = {};
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
                this.movie = data;
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }
}

export default new MovieStore()
