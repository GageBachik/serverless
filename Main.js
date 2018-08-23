/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Analytics, Auth} from 'aws-amplify';
import Tab from './Tabs'
import AuthComp from './Auth'

type Props = {};
class Main extends Component<Props> {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user);
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user.username) {
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <Tab />
      )
    }
    return (
      <AuthComp />
    )
  }
}

export default Main
