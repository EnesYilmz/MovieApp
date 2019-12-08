import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {inject, observer} from 'mobx-react';

import NavigationService from '../../NavigationService';
import MovieListItem from './MovieListItem';
import {List, Spinner} from 'native-base';
import MenuButton from '../../components/MenuButton';

@inject('MovieStore')
@observer
export default class PopularMoviesWithGenre extends Component {
    state={
        page: 1
    };

    static navigationOptions = ({ navigation }) => ({
        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Genre': navigation.state.params.title
    });

    constructor(props) {
        super(props);
        this.props.MovieStore.moviesWithGenre = [];
        this.setState({
            page: 1
        });
        let title = this.props.MovieStore.selectedGenre.name;
        this.props.navigation.setParams({title})
    }

    componentDidMount() {
        this.props.MovieStore.getMoviesWithGenre(this.state.page);
    }

    loadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.props.MovieStore.getMoviesWithGenre(this.state.page);
        });
    };
    render() {
        const {MovieStore} = this.props;
        return (
            <List>
                <FlatList
                    data={MovieStore.moviesWithGenre}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <MovieListItem item={item}/>}
                    numColumns={2}
                    ListFooterComponent={<Spinner size={"small"} color={"#333"} />}

                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.2}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({});
