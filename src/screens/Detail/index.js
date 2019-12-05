import React, {Component} from 'react';
import {View, Dimensions, Image, StyleSheet, FlatList} from 'react-native';

import {Content, H1, H2, Spinner, Text, Button} from 'native-base';

import {inject, observer} from 'mobx-react';
import MovieListItem from '../Home/MovieListItem';

@inject('MovieStore')
@observer
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.item = props.navigation.getParam('item');
        this.props.MovieStore.getMovie(this.item.id);
    }

    render() {
        const {MovieStore} = this.props;
        const movie = MovieStore.movie;
        return (
            <Content style={{padding: 10}}>
                {MovieStore.loading && <Spinner size={'large'} color={'#333'}/>}
                {!MovieStore.loading &&
                <View>
                    <View style={styles.line}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.image}
                            source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path}}/>
                    </View>
                    <View style={styles.viewPaddingBottom}>
                        <H1>{movie.title}</H1>
                        <View style={styles.viewPaddingTop} >
                            <FlatList
                                data={movie.genres}
                                horizontal={true}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({item}) =>
                                    <View style={styles.genres}>
                                        <Text style={{color:'gray'}}>{item.name}</Text>
                                    </View>
                                }/>
                        </View>
                    </View>
                    <View style={[styles.body, styles.viewPaddingBottom]}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.poster}
                            source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path}}/>
                        <View style={styles.viewPaddingLeft}>
                            <Text>Average Score: {movie.vote_average}</Text>
                            <Text>Release: {movie.release_date}</Text>
                            <Text>Runtime: {movie.runtime} minutes</Text>
                            <Text>Budget: {movie.budget} $</Text>
                            <Text>Revenue: {movie.revenue} $</Text>
                        </View>
                    </View>
                    <View style={{paddingBottom:20}}>
                        <H2>Overview</H2>
                        <Text>{movie.overview}</Text>
                    </View>
                </View>
                }
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 1.80,
    },
    line: {
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    viewPaddingBottom: {
        paddingBottom: 10,
    },
    viewPaddingTop: {
        paddingTop: 5,
    },
    viewPaddingLeft: {
        paddingLeft: 10,
    },
    poster: {
        width: '40%',
        height: Dimensions.get('window').width / 1.80,
    },
    body: {
        flexDirection: 'row'
    },
    genres: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        marginHorizontal:2
    }
});
