import React, {Component} from 'react';
import {View, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import {Content, H1, H2, Spinner, Text, Button} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import ViewMoreText from 'react-native-view-more-text';

import NavigationService from '../../NavigationService';
import {inject, observer} from 'mobx-react';

@inject('MovieStore')
@observer
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.item = props.navigation.getParam('item');
        this.props.MovieStore.getMovie(this.item.id);
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    renderViewMore(onPress) {
        return (
            <Text onPress={onPress} style={{color: 'blue'}}>Read more</Text>
        );
    }

    renderViewLess(onPress) {
        return (
            <Text onPress={onPress} style={{color: 'blue'}}>View less</Text>
        );
    }

    render() {
        const {MovieStore} = this.props;
        const movie = MovieStore.movieDetail;
        const cast = MovieStore.movieCast;
        const crew = MovieStore.movieCrew;
        const reviews = MovieStore.movieReviews;
        const similar = MovieStore.movieSimilar;
        let scoreColour;
        if (movie.vote_average >= 8) {
            scoreColour = '#33ff33';
        } else if (movie.vote_average >= 7) {
            scoreColour = '#3399FF';
        } else if (movie.vote_average >= 6) {
            scoreColour = '#ffff00';
        } else {
            scoreColour = '#ff3333';
        }

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
                        <View style={styles.header}>
                            <View style={{width: Dimensions.get('window').width / 1.20}}>
                                <H1>{movie.title}</H1>
                            </View>
                            <View>
                                <ProgressCircle
                                    percent={movie.vote_average * 10}
                                    radius={20}
                                    borderWidth={6}
                                    color={scoreColour}
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text style={{fontSize: 18}}>{movie.vote_average}</Text>
                                </ProgressCircle>
                            </View>
                        </View>
                        <View style={styles.viewPaddingTop}>
                            <FlatList
                                data={movie.genres}
                                horizontal={true}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({item}) =>
                                    <View style={styles.genres}>
                                        <Text style={{color: 'gray'}}>{item.name}</Text>
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
                            <Text>Status: {movie.status}</Text>
                            <Text>Release: {movie.release_date}</Text>
                            <Text>Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m </Text>
                            <Text>Budget: {movie.budget === 0 ? '-' : this.formatNumber(movie.budget) + '$'}</Text>
                            <Text>Revenue: {movie.revenue === 0 ? '-' : this.formatNumber(movie.revenue) + '$'}</Text>
                            <Text/>
                            <FlatList
                                data={crew}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({item}) => {
                                    if (item.job === 'Director' || item.job === 'Writer') {
                                        return (
                                            <Text>{item.job} : {item.name}</Text>
                                        );
                                    }
                                }
                                }/>
                        </View>

                    </View>
                    <View style={{paddingBottom: 20}}>
                        <H2>Overview</H2>
                        <Text>{movie.overview}</Text>
                    </View>
                    <View style={{paddingBottom: 20}}>
                        <H2>Top Billed Cast</H2>
                        <FlatList
                            data={cast.slice(0, 10)}
                            horizontal={true}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) =>
                                <View style={styles.cast}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={styles.castImage}
                                        source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.profile_path}}/>
                                    <Text style={{fontSize: 13}}>{item.name}</Text>
                                    <Text style={{fontSize: 10}}>{item.character.substring(0, 24)}</Text>
                                </View>
                            }/>
                    </View>
                    <View style={{paddingBottom: 20}}>
                        <H2>Reviews</H2>
                        <FlatList
                            data={reviews}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) =>
                                <View style={styles.review}>
                                    <Text style={{fontSize: 16}}>Author : {item.author}</Text>
                                    <ViewMoreText
                                        numberOfLines={3}
                                        renderViewMore={this.renderViewMore}
                                        renderViewLess={this.renderViewLess}
                                    >
                                        <Text style={{fontSize: 13}}>{item.content}</Text>
                                    </ViewMoreText>
                                </View>
                            }/>
                        {reviews.length === 0 && <Text style={{fontSize: 16}}>No reviews yet.</Text>}
                    </View>
                    <View style={{paddingBottom: 20}}>
                        <H2>Similar Movies </H2>
                        <FlatList
                            data={similar}
                            keyExtractor={item => item.id.toString()}
                            horizontal={true}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={() => this.props.MovieStore.getMovie(item.id)}>
                                    <Image
                                        resizeMode={'contain'}
                                        style={styles.miniPoster}
                                        source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path}}/>
                                </TouchableOpacity>
                            }/>
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
    castImage: {
        width: 120,
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
    miniPoster: {
        width: 120,
        height: Dimensions.get('window').width / 1.80,
        marginHorizontal: 2,
    },
    body: {
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genres: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        marginHorizontal: 2,
    },
    cast: {
        backgroundColor: '#d3d3d3',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        marginHorizontal: 2,
    },
    review: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        padding: 5,
        marginVertical: 2,
    },
});
