import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./screens/HomeScreen";
import Requests from './screens/Requests';
import App from "./App";


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: Requests,
  },
  Dapp:{
    screen: App
  }
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);