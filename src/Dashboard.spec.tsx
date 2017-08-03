import 'react-native'
import Dashboard from './Dashboard'
import React from 'react'
import renderer from 'react-test-renderer'
it('renders correctly', () => {
  const tree = renderer.create(
      <Dashboard />
  )
  expect(tree).toMatchSnapshot();
  expect(tree).toBeDefined()
})