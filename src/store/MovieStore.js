import {observable, action, configure, runInAction} from 'mobx';

import {API_BASE} from '../constants';
import axios from 'axios';

configure({
   enforceActions: 'observed'
});

import AuthStore from './AuthStore';

class MovieStore{
    @observable movies = [];
    @observable loading = false;

    @action async getMovies(){
        this.loading = true;
        try{
            const {data} = await axios.get(`${API_BASE}/3/discover/movie?api_key=0737c888e4221574324b8953a8bc93be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
            runInAction(() => {
                this.movies = data.results;
                this.loading = false;
            })
        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }
}

export default new MovieStore()
