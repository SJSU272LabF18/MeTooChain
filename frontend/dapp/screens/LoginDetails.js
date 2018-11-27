import React from "react";
// import axios from "axios";
import * as USERCONSTANTS from "../Helpers/helper";
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
    backgroundColor: "#eb3b5a",
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
    borderWidth: 0.4,
    //  borderRadius:15,
    textAlign: "center"
  },
  btn: {
    textAlign: "center",
    width: "90%",
    margin: 10,
    borderRadius: 5
  }
});

class LoginDetails extends React.Component {
  userSignup = () => {
    const url = USERCONSTANTS.ROOTURL + "login";
    Alert.alert(url);
    fetch(url, {
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
        try {
          AsyncStorage.setItem("username", "Sojan" + " " + "Mathew").then(
            this.props.navigation.navigate({ routeName: "Requests" })
          );
        } catch (e) {
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
        <View style={styles.btn}>
          <TextInput style={styles.textBox} value="User Name" />
        </View>
        <View style={styles.btn}>
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
