import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import {ListItem, Text, Body} from 'native-base';

import NavigationService from '../../NavigationService';

const MovieListItem = ({item}) => (
    <ListItem style={styles.item} noIndent onPress={() => NavigationService.navigate('Detail',{
        item
    })}>
        <Body>
            <Image
                resizeMode={'contain'}
                style={{ width: '100%',  height: Dimensions.get('window').width / 1.80}}
                source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path}}/>
        </Body>
    </ListItem>
);

export default MovieListItem;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        width: Dimensions.get('window').width / 2,
        height: '100%'
    }
});
