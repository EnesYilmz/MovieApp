import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {Content, H1, Text} from 'native-base';


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.item = props.navigation.getParam('item');
    }

    render() {
        return (
            <Content style={{padding: 10}}>
                <H1>{this.item.title}</H1>
                <Text>Average Score: {this.item.vote_average}</Text>
            </Content>
        );
    }
}

const styles = StyleSheet.create({});
