import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import LogoutButton from '../../components/LogoutButton';
import MovieListItem from './MovieListItem';
import MenuButton from '../../components/MenuButton';

import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';

import NavigationService from '../../NavigationService';
import MovieStore from '../../store/MovieStore';

@inject('MovieStore')
@observer
export default class Home extends Component {
    state = {
        page: 1,
    };

    static navigationOptions = {
        title: 'Popular',
        headerLeft:
            <TouchableOpacity onPress={() => NavigationService.navigate('Genres')}>
                <MenuButton/>
            </TouchableOpacity>,
        headerRight: <LogoutButton/>
    };

    componentDidMount() {
        this.props.MovieStore.getPopularMovies(this.state.page);
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.props.MovieStore.getMorePopularMovies(this.state.page);
        });
    };

    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                <FlatList
                    data={MovieStore.popularMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <MovieListItem item={item}/>}
                    numColumns={2}
                    ListFooterComponent={<Spinner size={'small'} color={'#333'}/>}

                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.2}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
