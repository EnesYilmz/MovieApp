import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import LogoutButton from '../../components/LogoutButton';
import MovieListItem from './MovieListItem';

import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';

@inject('MovieStore')
@observer
export default class Home extends Component {
    static navigationOptions = {
        headerLeft: LogoutButton,
    };

    componentDidMount() {
        this.props.MovieStore.getMovies()
    }

    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                {MovieStore.loading && <Spinner size={"small"} color={"#333"} />}
                <FlatList
                    data={MovieStore.movies}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => <MovieListItem item={item}/>}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
