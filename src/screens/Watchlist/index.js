import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import MovieListItem from './MovieListItem';
import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';

import MovieStore from '../../store/MovieStore';

@inject('MovieStore')
@observer
export default class Watchlist extends Component {
    state = {
        loading: true,
        refreshing: false
    };

    static navigationOptions = {
        headerRight: <LogoutButton/>,
    };

    componentDidMount() {
        this.props.MovieStore.getWatchlistMovies().then(() => this.setState({
            loading: false
        }))
    }

    getWatchlistMovies = () => {
        this.props.MovieStore.getWatchlistMovies().then(() => this.setState({
            refreshing: false
        }))
    };

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getWatchlistMovies();
        })
    };

    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                <FlatList
                    data={MovieStore.watchlistMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <MovieListItem item={item} index={index}/>}
                    ListFooterComponent={this.state.loading && <Spinner size={"large"} color={"#333"} />}

                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
