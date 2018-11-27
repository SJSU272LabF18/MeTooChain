import React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

const styles=StyleSheet.create({
  body:{
    backgroundColor:'#ededed',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn:{ 
    width: "90%",
    margin: 10,
    backgroundColor: "red" 
  }
});

class LoginScreen extends React.Component {
    static navigationOptions = {
      header: null,
      };
  render() {
    return (
      <View style={styles.body}>
        <View  style={styles.btn}>
        <Button
        color='#384499'
          title="Login" 
          onPress={() => {
            this.props.navigation.navigate({routeName: 'LoginDetails'});
          }}
        />
        </View>
        <View style={styles.btn}>
         <Button
         style={styles.btn}
         color='#384499'
          title="Sign Up"
          onPress={() => {
            this.props.navigation.navigate({routeName: 'Dapp'});
          }}
        />
        </View>
      </View>
    );
  }  
}

export default LoginScreen;