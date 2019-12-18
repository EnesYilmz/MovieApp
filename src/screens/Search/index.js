import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TextInput} from 'react-native';

import {List, Spinner} from 'native-base';
import {inject, observer} from 'mobx-react';
import MovieListItem from './MovieListItem';
import LogoutButton from '../../components/LogoutButton';

@inject('MovieStore')
@observer
export default class Search extends Component {
    state = {
        text: '',
    };

    static navigationOptions = {
        headerRight: <LogoutButton/>
    };

    constructor(props){
        super(props);
        this.searching = false;
    }

    searchMovie = text => {
        this.props.MovieStore.setSearchedMovies([]).then(() => this.props.MovieStore.searchMovies(text));
    };

    render() {
        const {MovieStore} = this.props;
        const {text} = this.setState;
        return (
            <View>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Enter the name of the movie..."
                        style={styles.searchInput}
                        value={text}
                        onChangeText={text => {
                            this.setState({
                                text,
                            });

                            this.searchMovie(text);
                        }}
                    />
                </View>
                <View style={styles.listContainer}>
                    <List>
                        <FlatList
                            data={MovieStore.searchedMovies}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item, index}) => <MovieListItem item={item} index={index}/>}
                            ListFooterComponent={MovieStore.loading && <Spinner size={'large'} color={'#333'}/>}
                        />
                    </List>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 100,
    },
    searchContainer: {
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    searchInput: {
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});
