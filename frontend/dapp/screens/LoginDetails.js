import React from 'react';
import { View, Text, Button,TextInput,StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    textBox:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
  });

class LoginDetails extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Please Enter Your Username and Password</Text>
        <TextInput
        style={styles.textBox}
        value="UserName"
      />
      <TextInput
        style={styles.textBox}
        value="Password"
      />
         <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate({routeName: 'Dapp'});
          }}
        />
      </View>
    );
  }  
}

export default LoginDetails;