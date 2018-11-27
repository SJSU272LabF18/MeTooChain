import React from "react";
// import axios from "axios";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Alert
} from "react-native";

const styles = StyleSheet.create({
  bigblue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30
  },
  body: {
    backgroundColor: "#ededed",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    color: "white",
    paddingBottom: 25
  },
  textBox: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
  //  borderWidth: 0.4,
    //  borderRadius:15,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  btn: {
    textAlign: "center",
    width: "90%",
    marginTop:50,
    borderRadius: 5
  },
  TextParent: {
    textAlign: "center",
    width: "90%",
    margin: 10,
    borderRadius: 5
  }
});

class LoginDetails extends React.Component {
   userSignup = () => {
    fetch("http://10.250.157.76:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "sojan",
        password: "sojan"
      })
    })
      .then(response => response.json())
      .then(responseData => {
        // this._onValueChange(STORAGE_KEY, responseData.id_token),
        // AlertAndroid.alert(
        //   "Signup Success!",
        //   "Click the button to get a Chuck Norris quote!"
        // );
        console.log(this.props);
        try{
         AsyncStorage.setItem('username', 'Sojan'+' '+'Mathew').then(
          this.props.navigation.navigate({ routeName: "TabNavigator" })
         );
        }catch(e){
        Alert.alert(e);
        }
       
      })
      .done();
  };

  render() {
    return (
      <View style={[styles.header, styles.body]}>
        <Text style={styles.header}>
          Please Enter Your Username and Password
        </Text>
        <View style={styles.TextParent}>
          <TextInput style={styles.textBox} value="User Name" />
        </View>
        <View style={styles.TextParent}>
          <TextInput style={styles.textBox} value="Password" />
        </View>
        <View style={styles.btn}>
          <Button color="#384499" title="Login" onPress={this.userSignup} />
        </View>
      </View>
    );
  }
}

export default LoginDetails;
