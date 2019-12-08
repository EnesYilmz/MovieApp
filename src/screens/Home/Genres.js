import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {List, Spinner, ListItem, Text, Left, Right, H3} from 'native-base';
import MovieListItem from '../TopRated/MovieListItem';

import {inject, observer} from 'mobx-react';
import NavigationService from '../../NavigationService';

@inject('MovieStore')
@observer
export default class Genres extends Component {

    componentDidMount() {
        this.props.MovieStore.getGenres();
    }

    navigateWithGenres = (item) => {
        this.props.MovieStore.selectedGenre = item;
        NavigationService.navigate('PopularMoviesWithGenre');
    };

    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                <FlatList
                    data={MovieStore.genres}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                        <ListItem noIndent
                                  onPress={() => this.navigateWithGenres(item)}>
                            <Left>
                                <H3>{item.name}</H3>
                            </Left>
                        </ListItem>}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
