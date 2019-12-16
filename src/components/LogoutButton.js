import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import {inject} from 'mobx-react';
import {Icon} from "native-base";

@inject('AuthStore')
export default class LogoutButton extends Component {
  render() {
    return (
      <TouchableOpacity
          onPress={() => this.props.AuthStore.removeToken()}
          style={styles.buttonContainer}>
          <Icon name="log-out" style={{fontSize: 26}}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 18
    },
    text: {
        fontSize: 14
    }
});
