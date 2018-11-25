import React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

const styles=StyleSheet.create({
  body:{
    backgroundColor:'#fd86b0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.body}>
        <Text>Login Screen Start</Text>
        <Button
          title="Login" 
          onPress={() => {
            this.props.navigation.navigate({routeName: 'LoginDetails'});
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