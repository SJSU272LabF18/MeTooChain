import React from 'react';
import { View, Text, Button } from 'react-native';
class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate({routeName: 'Details'});
          }}
        />
         <Button
          title="Sign Up"
          onPress={() => {
            this.props.navigation.navigate({routeName: 'Dapp'});
          }}
        />
      </View>
    );
  }  
}

export default LoginScreen;