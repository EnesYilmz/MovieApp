import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import LogoutButton from '../../components/LogoutButton';
import MovieListItem from './MovieListItem';

import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';
import NavigationService from '../../NavigationService';

@inject('MovieStore')
@observer
export default class TopRated extends Component {
    state={
        page: 1
    };

    static navigationOptions = {
        headerRight: <LogoutButton/>
    };

    componentDidMount() {
        this.props.MovieStore.getTopRatedMovies(this.state.page)
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.props.MovieStore.getTopRatedMovies(this.state.page)
        });
    };

    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                <FlatList
                    data={MovieStore.topRatedMovies.slice(1)}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <MovieListItem item={item} index={index}/>}
                    ListFooterComponent={<Spinner size={"small"} color={"#333"} />}

                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.2}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
