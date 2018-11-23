import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./screens/HomeScreen";
import Requests from './screens/Requests';
import App from "./App";
import LoginScreen from './screens/LoginScreen';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Login:{
    screen:LoginScreen
  },
  Details: {
    screen: Requests
  },
  Dapp:{
    screen: App
  }
}, {
    initialRouteName: 'Login',
});

export default createAppContainer(AppNavigator);