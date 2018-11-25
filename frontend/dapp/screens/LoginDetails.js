import React from 'react';
import { View, Text, Button,TextInput,StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    body:{
      backgroundColor:'#eb3b5a',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header:{
      color:"white",
      paddingBottom:25
    },
    textBox:{
        height: 40,
        borderColor: 'gray',
        backgroundColor:"white",
        borderWidth: 0.4,
      //  borderRadius:15,
        textAlign:"center"
    },
    btn:{ 
      textAlign:"center",
      width: "90%",
      margin: 10, 
      borderRadius:5
    }
  });

class LoginDetails extends React.Component {
  render() {
    return (
      <View style={[styles.header,styles.body]}>
        <Text style={styles.header}>Please Enter Your Username and Password</Text>
        <View  style={styles.btn}>
        <TextInput
        style={styles.textBox}
        value="User Name"
      />
      </View>
      <View  style={styles.btn}>
      <TextInput

        style={styles.textBox}
        value="Password"
      />
      </View>
      <View style={styles.btn}>
         <Button
          color='#384499'
          title="Login"
          onPress={() => {
            this.props.navigation.navigate({routeName: 'Dapp'});
          }}
        />
        </View>
      </View>
    );
  }  
}

export default LoginDetails;