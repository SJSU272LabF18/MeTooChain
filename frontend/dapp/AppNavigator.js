import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./screens/HomeScreen";
import Requests from './screens/Requests';
import App from "./App";
import LoginScreen from './screens/LoginScreen';
import LoginDetails from './screens/LoginDetails';
import UserRequest from './screens/UserRequest';
import ModifyConsent from './screens/ModifyConsent';
import ContractConfirmation from './screens/ContractConfirmation';
import DenyConsent from './screens/DenyConsent';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Login:{
    screen:LoginScreen
  },
  Requests: {
    screen: Requests
  },
  LoginDetails:{
    screen:LoginDetails
  },
  userRequest:{
   screen:UserRequest 
  },
  ContractConfirmation:{
    screen:ContractConfirmation
  },
  DenyConsent:{
    screen:DenyConsent
  },
  Dapp:{
    screen: App
  },
  ModifyConsent:{
    screen:ModifyConsent
  }
}, {
    headerMode: 'none',
    initialRouteName: 'Login',
});

export default createAppContainer(AppNavigator);