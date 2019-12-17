import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import MovieListItem from './MovieListItem';
import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';

import NavigationService from '../../NavigationService';
import MovieStore from '../../store/MovieStore';

@inject('MovieStore')
@observer
export default class Watchlist extends Component {
    state = {
        loading: true
    };

    static navigationOptions = {
        headerRight: <LogoutButton/>,
    };

    componentDidMount() {
        this.props.MovieStore.getWatchlistMovies().then(() => this.setState({
            loading: false
        }))
    }

    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                <FlatList
                    data={MovieStore.watchlistMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <MovieListItem item={item} index={index}/>}
                    ListFooterComponent={this.state.loading && <Spinner size={"large"} color={"#333"} />}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
