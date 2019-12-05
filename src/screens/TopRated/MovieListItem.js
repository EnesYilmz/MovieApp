import React from 'react';
import {ListItem, Text, Left, Right, Icon } from 'native-base';

import NavigationService from '../../NavigationService';

const MovieListItem = ({item}) => (
    <ListItem noIndent onPress={() => NavigationService.navigate('Detail',{
        item
    })}>
        <Left>
            <Text>{item.title}</Text>
        </Left>
        <Text>Avarage: {item.vote_average}</Text>
        <Right>

            <Icon name="arrow-forward" />
        </Right>
    </ListItem>
);

export default MovieListItem;
