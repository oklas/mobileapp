/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var Web3 = require('web3');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8444'));

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export interface Props { }
export interface State { }

export default class mobileapp extends React.Component<Props, State> {
  render() {
    // var coinbase = web3.eth.coinbase;
    // var balance = web3.eth.getBalance(coinbase);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! Awesome!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles:any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mobileapp', () => mobileapp);
