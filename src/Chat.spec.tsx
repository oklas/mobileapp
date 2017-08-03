import 'react-native'
import React from 'react'
import Chat from './Chat'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


jest.mock('wrtc-simple-data-native', () => {
  return require('wrtc-simple-data')
});

jest.mock('react-native-gifted-chat', () => {
  return require('./test/GiftedChat.mock');
});

// https://github.com/airbnb/enzyme/issues/614

it('renders correctly', () => {
  const tree = renderer.create(
    <Chat />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toBeDefined();
});



