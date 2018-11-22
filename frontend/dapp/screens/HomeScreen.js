import React from 'react';
import { View, Text, Button } from 'react-native';
import {StackActions, NavigationActions } from 'react-navigation';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Details' })
              ],
            }))
          }}
        />
         <Button
          title="Go to Dapp Images"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Dapp' })
              ],
            }))
          }}
        />
      </View>
    );
  }  
}

export default HomeScreen;