import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import LogoutButton from '../../components/LogoutButton';
import MovieListItem from './MovieListItem';

import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';

@inject('MovieStore')
@observer
export default class Home extends Component {
    state={
        page: 1
    };

    static navigationOptions = {
        headerRight: null
    };

    componentDidMount() {
        this.props.MovieStore.getPopularMovies(this.state.page)
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.props.MovieStore.getPopularMovies(this.state.page)
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

                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.2}
                />
                {MovieStore.loading && <Spinner size={"small"} color={"#333"} />}
            </List>
        );
    }
}

const styles = StyleSheet.create({});
