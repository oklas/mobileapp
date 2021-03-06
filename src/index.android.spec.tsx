import 'react-native'
import React from 'react'
import Index from './index.android'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


jest.mock('wrtc-simple-data-native', () => {
  return require('wrtc-simple-data')
});

jest.mock('react-native-gifted-chat', () => {
  return require('./test/GiftedChat.mock');
});

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toBeDefined();
});



