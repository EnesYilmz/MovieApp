import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

export default class MenuButton extends Component {
    toggleMenu = () => {

    };

    render() {
        return (
                <View style={styles.container}>
                    <Icon ios='ios-menu' android="md-menu" style={{fontSize: 26}}/>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
    },
});
