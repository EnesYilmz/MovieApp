import React from 'react';
import {ListItem, Text, Left, Right, H3 } from 'native-base';

import NavigationService from '../../NavigationService';
import ProgressCircle from 'react-native-progress-circle';

const scoreColour = (vote_average) => {
    let scoreColour;
    if (vote_average >= 8) {
        scoreColour = '#33ff33';
    } else if (vote_average >= 7) {
        scoreColour = '#3399FF';
    } else if (vote_average >= 6) {
        scoreColour = '#ffff00';
    } else if (vote_average >= 5) {
        scoreColour = '#ff3333';
    }
    return scoreColour;
};

const MovieListItem = ({item, index}) => (
    <ListItem noIndent onPress={() => NavigationService.navigate('Detail',{
        item
    })}>
        <Left>
            <H3>{index + 1}. {item.title}</H3>
        </Left>
        <Right>
            <ProgressCircle
                percent={item.vote_average * 10}
                radius={18}
                borderWidth={5}
                color={scoreColour(item.vote_average)}
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{fontSize: 16}}>{item.vote_average}</Text>
            </ProgressCircle>
        </Right>
    </ListItem>
);

export default MovieListItem;
