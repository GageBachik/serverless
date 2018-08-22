import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { TabNavigator } from 'react-navigation'
import { Image, StyleSheet } from 'react-native'
import App from './App';

const tabs = {
  Home: {
    screen: App,
    title: 'Home',
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Entypo name='home' size={25} color={tintColor} />
      )
    }
  },
  Search: {
    screen: App,
    navigationOptions: {
      title: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Entypo name='notification' size={25} color={tintColor} />
      )
    }
  }
}

const config = {
  tabBarOptions: {
    activeTintColor: '#0091EA',
    inactiveTintColor: '#666',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
    }
  }
}

export default TabNavigator(tabs, config)