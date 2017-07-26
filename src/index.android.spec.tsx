import 'react-native';
import React from 'react';
import Index from './index.android';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('./FacadeWebRTC', () => {
  return require('./FacadeWebRTC.mock');
});

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  // expect(tree).toBeDefined();
});



