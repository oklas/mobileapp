/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import Chat from './Chat'


export interface Props { }
export interface State { }

export default class mobileapp extends React.Component<Props, State> {
  render() {
    // var coinbase = web3.eth.coinbase;
    // var balance = web3.eth.getBalance(coinbase);
    return (
      <Chat wrtcDataParams={{
        signallingServer:'http://192.168.0.242:3000'
      }} />
    );
  }
}

AppRegistry.registerComponent('mobileapp', () => mobileapp);
